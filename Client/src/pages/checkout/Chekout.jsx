import Address from "@/components/Address";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { PLACE_ORDER } from "@/lib/constants";
import { useAppStore } from "@/store/store";
import { BadgeIndianRupee, Clock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    displayProducts,
    orderAmount,
    deliveryCharge,
    setOrderAddress,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    paymentMode,
    setPaymentMode,
    addresses,
    orderProducts,
    orderAddress,
    isOrderFromCart,
    platFormFee,
    gst
  } = useAppStore();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const { post } = useApi()
  const { updatePendingOrders, clearCart } = useAppStore()
  const navigate = useNavigate()
  const amount = orderAmount + deliveryCharge + platFormFee + gst

  const placeOrder = async () => {
    if (selectedAddress === null) return;
    const result = await post(PLACE_ORDER,
      { amount, deliveryCharge, paymentMode, orderProducts, orderAddress, isOrderFromCart, platFormFee, gst })
    if (result.success) {
      updatePendingOrders(result.data.order)
      navigate("/orders")
      clearCart()
    }
  }


  return (
    <div className="h-[calc(100vh-100px)] sm:h-[calc(100vh-140px)] max-w-7xl w-full mx-auto flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex justify-between w-full px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">Checkout</h1>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-4 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 h-full min-h-0 overflow-y-auto hide-scrollbar">

          <section className="lg:min-h-[400px] bg-white rounded-2xl shadow-sm border p-6 flex flex-col lg:h-full h-fit lg:overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-800">Review Products</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Step 1</span>
            </div>

            <div className="space-y-3 lg:min-h-0 overflow-y-auto pr-2 h-full hide-scrollbar">
              {displayProducts.map((product, index) => (
                <CartItem
                  key={product._id || index}
                  item={product}
                  increase={increaseQuantity}
                  decrease={decreaseQuantity}
                  remove={removeItem}
                  checkout={true}
                />
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex-shrink-0">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Items:</span>
                <span className="font-medium">{displayProducts.length}</span>
              </div>
            </div>
          </section>

          {/* Step 2: Delivery Address */}
          <section className="lg:min-h-[400px] bg-white rounded-2xl shadow-sm border p-6  flex flex-col lg:h-full h-fit lg:overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Step 2</span>
            </div>

            <div className="space-y-3 lg:min-h-0 overflow-y-auto pr-2 h-full hide-scrollbar">
              {addresses.map((address, index) => (
                <div key={address._id || index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={`${index}`}
                    name="address"
                    checked={address._id === selectedAddress}
                    value={`${address.roomNo}, ${address.buildingName}, ${address.area}, ${address.landmark} ${address.pincode}`}
                    onChange={(e) => {
                      setOrderAddress(e.target.value)
                      setSelectedAddress(address._id)
                    }}
                    className="w-4 h-4 text-orange-400 border-gray-300 focus:ring-orange-400 mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 cursor-pointer"
                    onClick={() => {
                      setOrderAddress(`${address.roomNo}, ${address.buildingName}, ${address.area}, ${address.landmark} ${address.pincode}`)
                      setSelectedAddress(address._id)
                    }}>
                    <Address address={address} />
                  </div>
                </div>
              ))}

              {addresses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No addresses found</p>
                  <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                    Add New Address
                  </button>
                </div>
              )}
            </div>
          </section>


          <section className="lg:col-span-2 xl:col-span-1 bg-white rounded-2xl shadow-sm border p-6 flex flex-col lg:h-full h-fit lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-800">Payment & Summary</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Step 3</span>
            </div>

            <div className="flex-1 flex flex-col justify-between lg:min-h-0">

              <div className="mb-6 pb-6 border-b flex-shrink-0">
                <h3 className="text-md font-medium text-gray-700 mb-4">Payment Method</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="online"
                      name="payment"
                      value="online"
                      checked={paymentMode === 'online'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-4 h-4 text-orange-400 border-gray-300 focus:ring-orange-400"
                    />
                    <label htmlFor="online" className="text-sm font-medium text-gray-700">Online Payment</label>
                    <div className="text-xs text-gray-500">GPay, PhonePe, Paytm</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      value="cod"
                      checked={paymentMode === 'cod'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-4 h-4 text-orange-400 border-gray-300 focus:ring-orange-400"
                    />
                    <label htmlFor="cod" className="text-sm font-medium text-gray-700">Cash on Delivery</label>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                  </div>
                </div>
              </div>


              <div className="flex-shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({displayProducts.length} items)</span>
                    <span className="font-medium">₹{orderAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="font-medium">₹{platFormFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (5%)</span>
                    <span className="font-medium">₹{gst}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-orange-600">
                      ₹{orderAmount + deliveryCharge + platFormFee + Math.round((orderAmount) * 0.05)}
                    </span>
                  </div>
                </div>

                <Button variant="primary" className="w-full my-4" onClick={placeOrder} disabled={selectedAddress === null}>
                  Place Order • ₹{amount}
                </Button>


                <div className="text-xs sm:text-sm flex gap-4 justify-center">
                  <span className="text-foreground flex gap-1 items-center justify-center">
                    <ShieldCheck size={15} className="text-primary" /> Secure Checkout
                  </span>
                  <span className="text-foreground flex gap-1 items-center justify-center">
                    <Clock size={15} className="text-primary" /> Fast Shipping
                  </span>
                  <span className="text-foreground flex gap-1 items-center justify-center">
                    <BadgeIndianRupee size={15} className="text-primary" /> Best Value
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
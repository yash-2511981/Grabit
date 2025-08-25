import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { useAppStore } from '@/store/store';
import { Calendar, CreditCard, X, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import DialogBox from './DialogBox';
import useApi from '@/hooks/useApi';
import { CANCLE_ORDER } from '@/lib/constants';

const OrderModal = ({ order, setOrder, showModal }) => {
    const { userInfo, removePendingOrder } = useAppStore();
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const { post } = useApi()


    const getPaymentStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'text-green-700 bg-green-100';
            case 'pending':
                return 'text-amber-700 bg-amber-100';
            case 'failed':
                return 'text-red-700 bg-red-100';
            default:
                return 'text-gray-700 bg-gray-100';
        }
    };

    const products = order.products || [];

    const itemTotal = products.reduce((sum, item) => {
        const price = item.product?.price || 140;
        const quantity = item.quantity || 0;
        return sum + (price * quantity);
    }, 0);

    const cancleOrder = async () => {
        const result = await post(CANCLE_ORDER, { orderId: order._id }, "Order Canclled Successfully!")
        if (result.success) {
            removePendingOrder(order._id)
        }
        showModal(false)
        setOrder({})
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">

            <div className="relative w-full max-w-md max-h-[90vh] flex flex-col">

                <X
                    onClick={() => {
                        showModal(false);
                        setOrder({});
                    }}
                    className="absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full size-10 transition-all duration-200 p-2 cursor-pointer hover:scale-110 shadow-lg z-10"
                />


                <Card className="bg-white rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 flex flex-col max-h-full overflow-hidden">

                    <CardHeader className="pb-2 flex-shrink-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-lg text-gray-900 font-semibold">
                                    {`${userInfo.firstName} ${userInfo.lastName}`}
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-700 mt-1">
                                    Order ID: {order._id}
                                </CardDescription>
                            </div>
                        </div>


                        <div className="flex mt-2">
                            {order.orderStatus && (
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    {order.orderStatus}
                                </span>
                            )}
                        </div>
                    </CardHeader>


                    <CardContent className="flex-1 overflow-y-auto space-y-3 px-6 hide-scrollbar">

                        <div>
                            <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-2">
                                Order Items ({products.length})
                            </h3>

                            <div className="max-h-48 overflow-y-auto px-4 border rounded-lg bg-gray-50">
                                <div className="space-y-2 py-2">
                                    {products.map((product, index) => (
                                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 bg-white rounded px-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{product.product?.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    ₹ {product.product?.price} × {product.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right font-semibold text-gray-900 ml-2">
                                                ₹ {(product.product?.price) * product.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Address */}
                        <div>
                            <h3 className='text-base font-semibold text-gray-900 mb-2'>Order Address</h3>
                            <div className='p-4 border rounded-2xl bg-gray-50'>
                                {order.address}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Order Summary</h3>
                            <div className="bg-amber-50 rounded-lg p-4 space-y-2 border border-amber-200">
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>Item Total:</span>
                                    <span className="font-medium">₹ {itemTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>Platform Fee:</span>
                                    <span className="font-medium">₹ {order.platFormFee}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>GST(5%):</span>
                                    <span className="font-medium">₹ {order.gst}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-700">
                                    <span>Delivery Charge:</span>
                                    <span className="font-medium">₹ {order.deliveryCharge}</span>
                                </div>
                                <div className="border-t border-amber-300 pt-2 mt-2">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span className="text-gray-900">Total Amount:</span>
                                        <span className="text-amber-700">₹ {order.amount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment & Date Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 justify-between">
                                <div className='flex items-center gap-3'>
                                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <CreditCard className="w-4 h-4 text-amber-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Payment Method</p>
                                        <p className="text-xs text-gray-600">{order.paymentMode === 'cod' ? "Cash On Delivery" : order.paymentMode}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                                    {order.paymentStatus || 'pending'}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-gray-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Order Date</p>
                                    <p className="text-xs text-gray-600">{formatDate(order.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* Fixed Footer - Delete Button */}
                    {(order.orderStatus !== "completed" && order.orderStatus !== "cancelled") && (
                        <div className="flex-shrink-0 px-6">
                            <div className="pt-3 border-t border-gray-300">
                                <button
                                    onClick={() => setOpenDialogBox(true)}
                                    className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 py-3 px-4 rounded-lg font-medium transition-colors duration-200 border border-red-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Cancle Order
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                {openDialogBox &&

                    <DialogBox open={openDialogBox} setOpen={setOpenDialogBox} data={{ orderId: order._id }} action={cancleOrder} />}
            </div>
        </div>
    );
};

export default OrderModal;
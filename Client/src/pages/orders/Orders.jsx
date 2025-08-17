import CartSheet from "@/components/CartSheet";
import PendingOrder from "./PendingOrder";
import { Button } from "@/components/ui/button";
import { completedOrders, pendingOrders } from "@/lib/dummy";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { BoxIcon, Clock4, PackageCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompletedOrder from "./CompletedOrder";
import OrderModal from "./OrderModal";

const Orders = () => {
    const { cartItems } = useAppStore()
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showOrderDetails, setShoOrderDetails] = useState(false)
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-150px)] w-full max-w-7xl mx-auto p-4 flex flex-col">
            {
                showOrderDetails && <OrderModal order={order} showModal={setShoOrderDetails} setOrder={setOrder} />
            }

            <div className="flex-shrink-0 mb-4 flex justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl mb-2 font-bold text-gray-700">Orders Overview</h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Track Your Orders.
                    </p>
                </div>
                <Button variant="primary" onClick={() => setShowOrderHistory(!showOrderHistory)} className="md:hidden block">
                    {showOrderHistory ? "Pending Orders" : "Order History"}
                </Button>
            </div>

            <div className={`flex-1 grid gap-6 min-h-0 ${pendingOrders.length > 0 ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
                {pendingOrders.length > 0 && (
                    <section className={cn("lg:col-span-1 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden", { "max-lg:hidden": showOrderHistory })}>

                        <div className="flex-shrink-0 flex items-center justify-between bg-yellow-100 p-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-1 rounded-sm">
                                    <Clock4 className="w-4 h-4 text-white" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
                            </div>
                            <span className="bg-amber-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full border border-amber-300">
                                {pendingOrders.length}
                            </span>
                        </div>

                        {pendingOrders.length > 0 ? (
                            <div className="flex-1 min-h-0 overflow-y-auto p-4 hide-scrollbar">
                                <div className="space-y-3">
                                    {pendingOrders.map((order, index) => (
                                        <PendingOrder key={order._id || index} order={order} showOrder={setShoOrderDetails} setOrder={setOrder} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-3">
                                <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 bg-yellow-100 flex items-center justify-center rounded-full">
                                    <BoxIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-amber-500" />
                                </div>
                                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 text-center">No Pending Orders</h2>
                                <p className="font-normal text-gray-500 text-sm text-center">your pending orders will appear here.</p>

                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        if (cartItems.length === 0)
                                            navigate("/home")
                                        else
                                            return
                                    }}
                                >
                                    {cartItems.length > 0 ? <CartSheet text={"Complete Your Order"} /> : "Browse Menu"}
                                </Button>
                            </div>
                        )}
                    </section>
                )}

                <section className={cn(`${pendingOrders.length > 0 ? 'lg:col-span-3' : 'col-span-4'} bg-white rounded-lg shadow-lg flex flex-col overflow-hidden`, { "max-lg:hidden": !showOrderHistory })}>

                    <div className="flex-shrink-0 flex items-center justify-between bg-yellow-100 p-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-1 rounded-sm">
                                <PackageCheck className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-700">Orders History</h2>
                        </div>
                        <span className="bg-amber-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full border border-amber-300">
                            {completedOrders.length}
                        </span>
                    </div>

                    {completedOrders.length > 0 ? (
                        <div className="flex-1 min-h-0 overflow-y-auto p-4 hide-scrollbar">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {completedOrders.map((order, index) => (
                                    <CompletedOrder key={order._id || index} order={order} showOrder={setShoOrderDetails} setOrder={setOrder} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-3">
                            <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 bg-yellow-100 flex items-center justify-center rounded-full">
                                <BoxIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-amber-500" />
                            </div>
                            <h2 className="font-semibold text-lg sm:text-xl text-gray-800 text-center">No Order History</h2>
                            <p className="font-normal text-gray-500 text-sm text-center">Your completed orders will appear here.</p>

                            <Button variant="primary" onClick={() => navigate("/home")}>Browse Products</Button>
                        </div>
                    )}

                </section>
            </div>
        </div>
    );
};

export default Orders;
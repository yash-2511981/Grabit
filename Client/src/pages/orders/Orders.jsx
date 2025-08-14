import PendingOrder from "@/components/PendingOrder";
import { pendingOrders } from "@/lib/dummy";
import { Box } from "lucide-react";

const Orders = () => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex-1 space-y-2">
            <div className="p-1">
                <div className="gap-2 text-start">
                    <h1 className="text-2xl sm:text-3xl mb-2 font-bold text-gray-700">Orders Overview</h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Track and manage all your pending and completed orders here.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
                {pendingOrders.length > 0 && (
                    <section className="lg:col-span-1 bg-white rounded-lg shadow-lg p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Pending Orders</h2>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                                {pendingOrders.length}
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto hide-scrollbar">
                            <div className="gap-3 flex flex-col max-h-[400px]">
                                {pendingOrders.map((order, index) => (
                                    <PendingOrder key={order._id || index} order={order} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className={`${pendingOrders.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-lg shadow-lg p-4 flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
                            <p className="text-gray-500 text-sm">All orders listed below</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            {0}
                        </span>
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden">
                        complete orders
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Orders;
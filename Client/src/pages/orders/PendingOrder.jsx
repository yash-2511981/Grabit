import React from 'react';
import { Clock, Package, User, DollarSign, CreditCard, IndianRupeeIcon, IndianRupee, Eye, X, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/button';
const PendingOrder = ({ order }) => {

    // Helper function to get order status color (matching Grabit theme)
    const getOrderStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
            case 'processing':
                return 'bg-blue-100 text-blue-700 border border-blue-200';
            case 'confirmed':
                return 'bg-green-100 text-green-700 border border-green-200';
            case 'completed':
                return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'text-green-600';
            case 'pending':
                return 'text-amber-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const totalItems = order.products?.length || 0;
    const firstProductName = order.products?.[0]?.product?.name || 'No items';
    const hasMoreItems = order.products?.length > 1;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className='flex justify-between items-start mb-2'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                    {order.orderStatus || 'Pending'}
                </span>
                {order.createdFromSubscriptions && (
                    <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full border border-purple-200">
                        Subscription
                    </span>
                )}
            </div>

            <div className="space-y-2 mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">
                            {totalItems} item{totalItems !== 1 ? 's' : ''}
                        </span>
                        <div className="text-xs text-gray-500 truncate">
                            {firstProductName}
                            {hasMoreItems && ` +${order.products.length - 1} more`}
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                </div>
                <span className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    Payment: {order.paymentStatus || 'Unknown'}
                </span>
            </div>

            <div className='flex items-center gap-1 mb-2'>
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-xs text-gray-500">
                    30 - 35 Min
                </span>
            </div>


            <div className="pt-3 border-t border-gray-100">
                <div className="flex gap-2">
                    <Button className="flex-1" variant="primary">
                        View Details
                    </Button>
                    {order.orderStatus !== 'completed' && (
                        <Button className="flex-1 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200" variant="outline">
                            Cancel
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingOrder;
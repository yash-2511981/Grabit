import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Calendar, IndianRupee, MapPin, Package } from 'lucide-react';
import React from 'react'

const CompletedOrder = ({ order }) => {

    const getOrderStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    const totalItems = order.products?.length || 0;
    const firstProductName = order.products?.[0]?.product?.name || 'No items';
    const hasMoreItems = order.products?.length > 1;
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className='flex justify-between items-start mb-2'>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
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

            <div className="flex items-center justify-between gap-2 mb-2">
                <div className='flex items-center gap-2'>
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
                <div className='flex items-center gap-2'>
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                        <IndianRupee className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-500">
                        ₹ {order.amount}
                    </span>
                </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
                <div className="flex gap-2">
                    <Button className="flex-1" variant="primary">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompletedOrder

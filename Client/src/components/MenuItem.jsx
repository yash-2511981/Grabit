import React from 'react';
import { cn } from '@/lib/utils';
import OrderNowBtn from '@/pages/Home/compoenents/OrderNowBtn';
import AddToCartBtn from '@/pages/Home/compoenents/AddToCartBtn';

const MenuItem = ({ product }) => {

    const isVeg = product.category === "veg"

    return (
        <div className='bg-white max-h-[150px] w-full rounded-2xl flex gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 relative overflow-hidden'>
            <div className='w-1/5 sm:w-1/4 h-full relative'>
                <img src={product.imageUrl} className='rounded-l-2xl h-full w-full  object-cover aspect-[4/3]' />

                {product.rating && (
                    <div className="absolute bottom-2 right-2 bg-yellow-50 text-yellow-700 text-xs px-2  rounded-full flex items-center gap-1 shadow-sm border border-yellow-200">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{product.rating / product.ratingCount}</span>
                    </div>
                )}
            </div>

            <div className='flex flex-col gap-2 py-2 flex-1 pr-3'>
                <div className=''>
                    <p className='text-sm font-bold text-gray-800 flex gap-2 items-center justify-start'>
                        <span>
                            {product.name}
                        </span>

                        <span className={`size-3 rounded-xs flex items-center justify-center border ${isVeg ? 'border-green-500' : 'border-red-500'}`}>
                            <span className={cn('size-1 rounded-full ', { 'bg-green-500': isVeg, "bg-red-500": !isVeg })}></span>
                        </span>
                    </p>
                    <p className='text-xs text-gray-600 max-w-[90%] truncate text text-wrap'>{product.description}</p>
                </div>

                <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>

                    <div className='flex gap-2'>
                        <>
                            <OrderNowBtn product={product} />
                            <AddToCartBtn product={product} variant="outline"/>
                        </>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MenuItem;
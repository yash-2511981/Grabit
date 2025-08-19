import { cn } from '@/lib/utils'
import { Check, CheckSquare, ShoppingBagIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import useApi from '@/hooks/useApi'
import { ADD_TO_CART } from '@/lib/constants'
import { useAppStore } from '@/store/store'

const Product = ({ product, onClick }) => {
    const { post } = useApi()
    const { addCartItem, productIsInCart } = useAppStore()

    const handleAddToCart = async (e) => {
        e.stopPropagation() // Prevent card click when clicking cart button
        const result = await post(ADD_TO_CART, { productId: product._id }, "Item Added in cart")
        if (result.success) {
            addCartItem(result.data)
        }
    }

    const isInCart = productIsInCart(product._id)

    return (
        <div
            className="bg-white rounded-xl shadow-sm hover:shadow-md active:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 hover:border-orange-200 cursor-pointer group touch-manipulation"
            onClick={onClick}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={product?.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />

                <div className="absolute top-2 left-2">
                    <div className={cn(
                        "w-4 h-4 rounded-sm border-2 bg-white flex items-center justify-center",
                        "border-green-500",
                        { "border-red-500": product.category === "non-veg" }
                    )}>
                        <div className={cn(
                            "w-2 h-2 rounded-full bg-green-500",
                            { "bg-red-500": product.category === "non-veg" }
                        )}></div>
                    </div>
                </div>


                <div className="absolute bottom-2 right-2 transition-opacity duration-200">
                    {isInCart ?
                        <Button variant="primary" className="rounded-full" title="Add to cart">
                            <CheckSquare size={20} />
                        </Button>
                        :
                        <Button variant="primary" className="rounded-full" title="Add to cart" onClick={handleAddToCart}>
                            <ShoppingBagIcon size={20} />
                        </Button>
                    }
                </div>

                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 rounded-full shadow-sm">
                    <span className="text-sm font-bold text-orange-600">₹{product.price}</span>
                </div>

            </div>


            <div className="py-2 flex flex-col px-2 justify-between">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate max-w-[90%]">
                    {product.name}
                </h3>
                <p className='text-gray-800 text-xs sm:text-base truncate max-w-[90%]'>
                    {product.description}
                </p>
            </div>
        </div>
    )
}

export default Product
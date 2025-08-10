import { cn } from '@/lib/utils'
import { ShoppingBagIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import useApi from '@/hooks/useApi'
import { ADD_TO_CART } from '@/lib/constants'
import { useAppStore } from '@/store/store'

const Product = ({ product }) => {
    const { post } = useApi()
    const { addCartItem } = useAppStore()

    const handleAddToCart = async () => {
        const result = await post(ADD_TO_CART, { productId: product._id }, "Item Added in cart")
        if (result.success) {
            addCartItem(result.data)
        }
    }

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-orange-200 group">
            <div className="relative">
                <div className="h-40 overflow-hidden">
                    <img
                        src={product?.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="absolute top-2 left-2">
                    <div className={`p-1 flex items-center justify-center border-2 rounded-sm  bg-white ${cn("border-green-500", { "border-red-600": product.category === "non-veg" })}`}>
                        <div className={`p-1  rounded-full ${cn("bg-green-500", { "bg-red-600": product.category === "non-veg" })}`}></div>
                    </div>
                </div>
                <div className='absolute bottom-2 right-2 hidden group-hover:block max-sm:block'>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md cursor-pointer" title="Add to cart" onClick={handleAddToCart}>
                        <ShoppingBagIcon size={20} />
                    </Button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-amber-600">₹{product.price}</span>
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md">
                        Order
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Product

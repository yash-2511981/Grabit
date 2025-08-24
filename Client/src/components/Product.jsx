import { cn } from '@/lib/utils'
import { CheckSquare, Home, ShoppingBagIcon, Star, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import useApi from '@/hooks/useApi'
import { ADD_TO_CART } from '@/lib/constants'
import { useAppStore } from '@/store/store'
import useColumns from '@/hooks/useColumns'
import { useNavigate } from "react-router-dom"

const Product = ({ product, open, setOpen, index }) => {
    const { post } = useApi()
    const navigate = useNavigate()
    const { addCartItem, productIsInCart, reorderOnLastProductCardClick, moveIndex, setCheckoutData } = useAppStore()

    const columns = useColumns()
    const isLastInRow = columns - 1 === index;

    const handleAddToCart = async (e) => {
        e.stopPropagation()
        const result = await post(ADD_TO_CART, { productId: product._id }, "Item Added in cart")
        if (result.success) {
            addCartItem(result.data)
        }
    }

    const handlOrderNow = () => {
        setCheckoutData([{ ...product, quantity: 1 }], product.price, false)
        setOpen(null)
        navigate("/checkout")
    }

    const isInCart = productIsInCart(product._id)

    const handleProductClick = () => {
        setOpen(product._id)
        if (isLastInRow) {
            reorderOnLastProductCardClick(index)
        }
    }

    return (
        <div
            className={cn(
                "product-card bg-white rounded-xl shadow-sm hover:shadow-md hover:border-orange-200 cursor-pointer group touch-manipulation active:shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 col-span-1 row-span-1",
                {
                    "shadow-xl border-amber-200 cursor-default col-span-2 row-span-2": open,
                    "hover:shadow-lg": !open,
                }
            )}
        >
            <div className={cn("relative aspect-[4/3] overflow-hidden", { "h-1/2 w-full aspect-[4/2]": open })} onClick={handleProductClick}>
                <img
                    src={product?.imageUrl}
                    alt={product.name}
                    className={cn("w-full h-full object-cover group-hover:scale-105 transition-transform duration-300")}
                    loading="lazy"
                />

                <div className="absolute top-3 left-3">
                    <div className={cn(
                        "w-5 h-5 rounded-sm border-2 bg-white flex items-center justify-center shadow-sm",
                        "border-green-500",
                        { "border-red-500": product.category === "non-veg" }
                    )}>
                        <div className={cn(
                            "w-2.5 h-2.5 rounded-full bg-green-500",
                            { "bg-red-500": product.category === "non-veg" }
                        )}></div>
                    </div>
                </div>

                <div className="absolute bottom-3 right-3 transition-opacity duration-200">
                    {isInCart ?
                        <Button variant="primary" className="rounded-full shadow-lg" title="In cart">
                            <CheckSquare size={20} />
                        </Button>
                        :
                        <Button variant="primary" className="rounded-full shadow-lg" title="Add to cart" onClick={handleAddToCart}>
                            <ShoppingBagIcon size={20} />
                        </Button>
                    }
                </div>

                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <span className="text-sm font-bold text-orange-600">₹{product.price}</span>
                </div>
            </div>

            <div className={cn("pt-3 pb-3 flex flex-col px-3 justify-between w-full", { "h-1/2 pb-0": open })} >
                <div className=''>
                    <h3 className={cn(
                        "font-bold text-gray-800 text-sm sm:text-base truncate max-w-[90%] flex justify-between mb-1",
                        {
                            "max-w-full text-lg": open
                        }
                    )}>
                        {product.name}
                        {open && (
                            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-1 rounded-full border border-yellow-200 flex items-center gap-1 shadow-sm">
                                <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                                <span className="text-sm font-bold text-yellow-700">{(product.rating / product.ratingCount).toFixed(1)}</span>
                            </div>
                        )}
                    </h3>
                    <p className={cn(
                        'text-gray-600 text-xs sm:text-sm truncate max-w-[90%]',
                        { 'max-w-full text-sm leading-relaxed line-clamp-2': open }
                    )}>
                        {product.description}
                    </p>
                </div>

                {open && (
                    <div className='flex-1 flex flex-col justify-between'>
                        <div className='flex flex-col mt-2'>
                            <div className='flex gap-2 bg-gray-50 rounded-lg p-3'>
                                <img
                                    src={product.restaurant.imageUrl}
                                    className='h-20 w-20 rounded-2xl'
                                />
                                <div className='flex flex-col w-full justify-between items-start pl-3'>
                                    <div className='flex items-center justify-between w-full'>
                                        <div className='flex items-center gap-2'>
                                            <span className="text-xl font-bold text-gray-800">{product.restaurant.name}</span>
                                        </div>
                                        <div className="bg-white px-2 py-1 rounded-full border border-yellow-200 flex items-center gap-1 shadow-sm">
                                            <Star className='w-3 h-3 text-yellow-500 fill-yellow-500' />
                                            <span className="text-xs font-bold text-yellow-700">{product.restaurant.rating}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <span className="text-sm">{product.restaurant.avgDeliveryTime} Min Delivery</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-600'>
                                        <Button variant="Link" className="text-sm p-0 cursor-pointer">View Menu</Button>
                                        <ArrowRight size={15} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3 pb-4'>
                            <Button
                                className='cursor-pointer font-semibold shadow-md hover:shadow-lg transition-all'
                                variant="primary"
                                onClick={handlOrderNow}
                            >
                                Order Now • ₹{product.price}
                            </Button>
                            <Button
                                className='cursor-pointer'
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpen(null)
                                    if (moveIndex !== null) {
                                        console.log("calling")
                                        reorderOnLastProductCardClick()
                                    }
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Product
import { Button } from '@/components/ui/button'
import useApi from '@/hooks/useApi'
import { ADD_TO_CART } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/store'
import { CheckSquare, ShoppingBagIcon } from 'lucide-react'

const AddToCartBtn = ({ product, variant, classNames }) => {

    const { post } = useApi()
    const { addCartItem, productIsInCart } = useAppStore()

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!isInCart) {
            const result = await post(ADD_TO_CART, { productId: product._id }, "Item Added in cart")
            if (result.success) {
                addCartItem(result.data)
            }
        }
    }

    const isInCart = productIsInCart(product._id)

    return (
        <Button
            variant={variant}
            className={cn("cursor-pointer", classNames)}
            onClick={handleAddToCart}
            title="Add to Cart"
        >
            {isInCart ? <CheckSquare /> : <ShoppingBagIcon />}
        </Button>
    )
}

export default AddToCartBtn

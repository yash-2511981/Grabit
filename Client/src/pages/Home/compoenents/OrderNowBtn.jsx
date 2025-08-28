import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/store'
import React from 'react'
import { useNavigate } from "react-router-dom"


const OrderNowBtn = ({ product }) => {
    const navigate = useNavigate()
    const { setCheckoutData } = useAppStore()

    const handleOrderNow = () => {
        setCheckoutData([{ ...product, quantity: 1 }], product.price, false)
        navigate("/checkout")
    }

    return (
        <Button
            className='cursor-pointer font-semibold shadow-md hover:shadow-lg transition-all'
            variant="primary"
            onClick={handleOrderNow}
        >
            Order Now • ₹{product.price}
        </Button>
    )
}

export default OrderNowBtn

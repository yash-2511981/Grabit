import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useAppStore } from "@/store/store"
import { BadgeDollarSign, ClipboardList, Clock, PartyPopper, Plus, ShieldCheck, ShoppingBagIcon } from "lucide-react"
import CartItem from "./CartItem";
import { Button } from "./ui/button";
import { useState } from "react";
import useApi from "@/hooks/useApi";
import { UPDATE_CART } from "@/lib/constants";
import EmptyCard from "./EmptyCard";
import { useNavigate } from "react-router-dom";


const CartSheet = ({ text }) => {
    const { cartItems, getCartTotal, increaseCartItemQuantity, decreaseCartItemQuantity, removeFromCart, setCheckoutData } = useAppStore();
    const [prevCartItems, setPrevCartItems] = useState(cartItems)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { patch } = useApi()
    const navigate = useNavigate()

    const total = getCartTotal();

    const handleCartToggle = async (open) => {
        if (!open && isCartOpen) {
            const prevQtyMap = new Map(prevCartItems.map(i => [i._id, i.quantity]))

            const changedItem = cartItems
                .filter(item => prevQtyMap.get(item._id) !== item.quantity)
                .map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }))

            if (changedItem.length > 0) {
                await patch(UPDATE_CART, { cartItems: changedItem })
                setPrevCartItems(cartItems)
            }
        }
        setIsCartOpen(open)
    }

    const handleCheckOut = async () => {
        setCheckoutData(cartItems, total, true)
        navigate("/checkout")
    }
    return (
        <Sheet open={isCartOpen} onOpenChange={handleCartToggle}>
            <SheetTrigger>
                {!text ?
                    <div className="relative">
                        <div className="absolute bg-primary bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-full size-5 top-[-5px] right-[-5px] text-sm flex items-center justify-center">{cartItems.length}</div>
                        <ShoppingBagIcon className="text-primary size-8 max-sm:size-8" />
                    </div> :
                    text
                }
            </SheetTrigger>
            <SheetContent className="sm:min-w-lg w-full p-2">
                <SheetHeader className="border-b">
                    <SheetTitle className="flex items-center justify-start gap-3">
                        <ShoppingBagIcon className="size-8 text-primary " />
                        <p className="text-3xl font-bold text-gray-700">Your Cart</p>
                        <div className="bg-yellow-200 rounded-full px-2 py-1 text-sm text-amber-600">{cartItems.length} Items</div>
                    </SheetTitle>
                    <SheetDescription>
                        {cartItems.length > 0 ? `Review your items and proceed to secure checkout` : `Add items in cart and proceed to secure checkout`}
                    </SheetDescription>
                </SheetHeader>
                {cartItems.length > 0 ? (
                    <div className="pt-4 flex-1 min-h-0 overflow-hidden">
                        <div className="h-full overflow-y-auto hide-scrollbar flex-col px-2">
                            <div className="gap-3 flex flex-col">
                                {cartItems.map((item, index) => {
                                    return <CartItem key={index || item._id} item={item}
                                        increase={increaseCartItemQuantity}
                                        decrease={decreaseCartItemQuantity}
                                        remove={removeFromCart}
                                    />
                                })
                                }
                            </div>
                        </div>
                    </div>) : (<EmptyCard text={`Oops! Your cart is empty.`} />)}

                <SheetFooter >
                    <SheetClose>
                        <div className="border-b-2 py-2">
                            {cartItems.length > 0 && <Button className="w-full" onClick={handleCheckOut} >Proceed To Checkout  &nbsp; {total}</Button>}
                            {cartItems.length === 0 && <Button className="w-full" onClick={() => navigate("/home")} >Add Products</Button>}
                        </div>
                    </SheetClose>
                    {cartItems.length > 0 ?
                        (<div className="text-sm flex gap-4 justify-center">
                            <span className="text-foreground flex gap-1 items-center justify-center">
                                <ShieldCheck size={15} className="text-primary" /> Secure Checkout
                            </span>
                            <span className="text-foreground flex gap-1 items-center justify-center">
                                <Clock size={15} className="text-primary" /> Fast Shipping
                            </span>
                            <span className="text-foreground flex gap-1 items-center justify-center">
                                <BadgeDollarSign size={15} className="text-primary" /> Best Value
                            </span>
                        </div>
                        )
                        :
                        (<div className="text-sm flex gap-4 justify-center">
                            <span className="text-foreground flex gap-1 items-center justify-center">
                                <Plus size={15} className="text-primary" /> Add Items
                            </span>
                            <span className="text-foreground flex gap-1 items-center justify-center">
                                <ClipboardList size={15} className="text-primary" /> Review Cart
                            </span>
                            <span className="text-foreground flex gap-1 items-center justify-center">
                                <PartyPopper size={15} className="text-primary" /> Enjoy Your Meal
                            </span>
                        </div>
                        )}
                </SheetFooter>
            </SheetContent>
        </Sheet >
    )
}

export default CartSheet

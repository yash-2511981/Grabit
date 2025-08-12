import useApi from "@/hooks/useApi";
import { REMOVE_FROM_CART } from "@/lib/constants";
import { useAppStore } from "@/store/store";
import { IndianRupeeIcon, Trash2, Minus, Plus } from "lucide-react";

const CartItem = ({ item }) => {
    const { increaseCartItemQuantity, decreaseCartItemQuantity, removeFromCart } = useAppStore();
    const { delete: deleteItem } = useApi();

    const onRemove = async (productId) => {
        const result = await deleteItem(`${REMOVE_FROM_CART}/${productId}`, { productId }, "Removed");
        if (result.success) {
            removeFromCart(productId)
        }
    }

    return (
        <div className="border rounded-lg p-2 flex items-center gap-3">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-sm"
            />

            <div className="flex justify-between items-center flex-1">
                <div className="flex flex-col gap-2">
                    <p className="font-bold">{item.name}</p>

                    <p className="font-bold text-primary flex items-center gap-1">
                        <IndianRupeeIcon size={14} />
                        {item.price}
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={() => decreaseCartItemQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <span className="min-w-[24px] text-center">{item.quantity}</span>
                        <button
                            className="p-1 rounded bg-gray-200 hover:bg-gray-300"
                            onClick={() => increaseCartItemQuantity(item._id, item.quantity + 1)}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                </div>

                <Trash2
                    size={18}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => onRemove(item._id)}
                />
            </div>
        </div>
    );
};

export default CartItem;

import MenuItem from "@/components/MenuItem";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import { Star, Clock } from "lucide-react";

const Menuitems = () => {
    const { products, showMenu, showMenuRestaurant, setShowMenu, setShowMenuRestaurant } = useAppStore();
    const { _id: resId, name, imageUrl, address, rating, avgDeliveryTime } = showMenuRestaurant;

    if (!showMenu && showMenuRestaurant) return null;

    return (
        <div className="p-4 pb-8 space-y-6">
            <div className="w-full max-h-[120px] gap-3 flex bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100 shadow-lg">
                <div className="w-1/4 sm:w-1/8">
                    <img src={imageUrl} alt={`${name} image`} className="rounded-l-2xl shadow-md h-full w-full" height={100} width={120} />
                </div>

                <div className="gap-1 h-full flex flex-col flex-1 justify-center py-2">
                    <p className="text-gray-800 font-bold text-xl md:text-2xl leading-tight">{name}</p>
                    <p className="text-gray-600 font-medium text-sm truncate">{address}</p>
                    <div className="flex items-center gap-4 text-xs mt-1">
                        <div className="top-2 right-2 bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-yellow-200">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold">{rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">{avgDeliveryTime || '30'} min</span>
                        </div>
                    </div>
                </div>
                <div className="pb-2 pr-2 flex items-end">
                    <Button
                        variant="outline"
                        className="font-medium text-xs md:text-sm px-4 py-2"
                        onClick={() => {
                            setShowMenu(false);
                            setShowMenuRestaurant({});
                        }}
                    >
                        Close Menu
                    </Button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-3'>
                {products.map((product, index) => {
                    if (product.restaurant._id === resId) {
                        return (
                            <MenuItem key={product._id || index} product={product} />
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default Menuitems;

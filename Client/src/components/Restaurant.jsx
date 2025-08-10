import { Clock, MapPin, Star } from "lucide-react";


const RestaurantCard = ({ restaurant }) => (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-amber-200 group cursor-pointer">
        <div className="flex">
            <div className="relative w-32 h-32 flex-shrink-0">
                <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                    <div className={`p-1 flex items-center justify-center border-2 rounded-sm bg-white ${restaurant.category === "non-veg" ? "border-red-600" : "border-green-500"}`}>
                        <div className={`p-1 rounded-full ${restaurant.category === "non-veg" ? "bg-red-600" : "bg-green-500"}`}></div>
                    </div>
                </div>
                <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${restaurant.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {restaurant.status}
                </div>
            </div>
            <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
                    <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-1" />
                        <span className="text-xs font-semibold text-amber-700">{restaurant.rating}</span>
                    </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{restaurant.address}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                    </div>
                    <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200">
                        View Menu
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default RestaurantCard
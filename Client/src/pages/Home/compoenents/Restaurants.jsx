import RestaurantCard from '@/components/Restaurant'
import { useAppStore } from '@/store/store'
import React from 'react'

const Restaurants = () => {

    const { restaurants } = useAppStore()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {restaurants.map((restaurant, index) => (
                <RestaurantCard key={restaurant._id || index} restaurant={restaurant} />
            ))}
        </div>
    )
}

export default Restaurants

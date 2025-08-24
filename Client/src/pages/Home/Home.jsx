import { filtersArray } from "@/lib/dummy"
import CategoryFilterButton from "./CategoryFilter"
import SwitchModeButton from "./SwitchModeButton"
import Product from "@/components/Product"
import { useAppStore } from "@/store/store"
import { useEffect, useState } from "react"
import useApi from "@/hooks/useApi"
import { GET_DISPLAY_ITEMS } from "@/lib/constants"
import RestaurantCard from "@/components/Restaurant"
import EmptyCard from "@/components/EmptyCard"

const Home = () => {
  const { products, vegMode, category, setProducts, setRestaurants, setSubscriptions, restaurants } = useAppStore()
  const { post } = useApi()
  const [isEmpty, setIsEmpty] = useState(false);
  const [openProduct, setOpenProduct] = useState(null);


  useEffect(() => {
    const getDisplayData = async () => {
      const result = await post(GET_DISPLAY_ITEMS, { vegMode, category })
      if (result.success && result.data.data.length !== 0) {
        setIsEmpty(false)
        if (category === "dish") {
          setProducts(result.data.data)
        } else if (category === "restaurants") {
          setRestaurants(result.data.data)
        } else if (category === "subscriptions") {
          setSubscriptions(result.data.data)
        }
      } else {
        setIsEmpty(true)
      }
    }
    getDisplayData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vegMode, category])

  return (
    <div className='w-full max-w-7xl mx-auto h-[calc(100vh-80px)] p-4 flex flex-col'>


      <div className='h-auto w-full px-4 grid grid-cols-[1fr_auto] max-sm:grid-cols-1 gap-2 items-center flex-shrink-0 border-b max-sm:border-none bg-white/80 backdrop-blur-sm p-2'>
        <div className="gap-2 w-auto flex p-2 overflow-x-auto">
          {filtersArray.map((filter, index) => {
            return (
              <CategoryFilterButton key={index} text={filter.text} value={filter.value} />
            );
          })}
        </div>
        <SwitchModeButton text="Veg Mode" value="veg" />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto hide-scrollbar">
          <div className="p-4 pb-">
            {isEmpty && <EmptyCard text="Opps! There is no restaurant near you" />}
            {category === "dish" &&
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                {products.map((product, index) => (
                  <Product
                    key={product._id || index}
                    product={product}
                    open={openProduct === product._id}
                    setOpen={setOpenProduct}
                    index={index}
                  />
                ))}
              </div>}
            {category === "restaurants" &&
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {restaurants.map((restaurant, index) => (
                  <RestaurantCard key={restaurant._id || index} restaurant={restaurant} />
                ))}
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
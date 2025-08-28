import { filtersArray } from "@/lib/dummy"
import CategoryFilterButton from "./compoenents/CategoryFilter"
import SwitchModeButton from "./compoenents/SwitchModeButton"
import { useAppStore } from "@/store/store"
import { useEffect, useRef, useState } from "react"
import useApi from "@/hooks/useApi"
import { GET_DISPLAY_ITEMS } from "@/lib/constants"
import EmptyCard from "@/components/EmptyCard"
import Loading from "@/components/ui/loading"
import Products from "./compoenents/Products"
import Restaurants from "./compoenents/Restaurants"
import Menuitems from "./compoenents/Menuitems"

const Home = () => {
  const { vegMode, category, setProducts, setRestaurants, setSubscriptions, setShowMenu, setShowMenuRestaurant, showMenu } = useAppStore()
  const { post } = useApi()
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null)
  const cardRefs = useRef({})

  const [openProduct, setOpenProduct] = useState(null)


  useEffect(() => {
    const getDisplayData = async () => {
      setLoading(true)
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
        setShowMenu(false)
        setShowMenuRestaurant({})
      } else {
        setIsEmpty(true)
      }
      setLoading(false)
    }
    getDisplayData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vegMode, category])

  const handleOpenProduct = (id) => {
    setOpenProduct(id)
    setTimeout(() => {
      if (id && cardRefs.current[id] && scrollContainerRef.current) {
        const cardElement = cardRefs.current[id]
        const scrollContainer = scrollContainerRef.current

        const cardRect = cardElement.getBoundingClientRect()
        const containerRect = scrollContainer.getBoundingClientRect()

        const scrollTop = scrollContainer.scrollTop
        const cardTop = cardRect.top - containerRect.top + scrollTop
        const containerHeight = containerRect.height
        const cardHeight = cardRect.height

        const targetScrollTop = cardTop - (containerHeight - cardHeight) / 2

        scrollContainer.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: "smooth"
        })
      }
    }, 100)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className='w-full max-w-7xl lg:mx-auto h-[calc(100vh-80px)] p-4 flex flex-col'>

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

        {/* This section will despaly the items from selected category */}
        {!showMenu && <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto hide-scrollbar"
        >
          <div className="p-4 pb-8">
            {isEmpty && <EmptyCard text="Opps! There is no restaurant near you" />}
            {category === "dish" && <Products handleOpenProduct={handleOpenProduct} openProduct={openProduct} cardRefs={cardRefs} />}
            {category === "restaurants" && <Restaurants />}
          </div>
        </div>}

        {/* this section will display menu of the particular restaurant */}
        {showMenu && <div
          ref={scrollContainerRef}
          className="h-full overflow-y-auto hide-scrollbar"
        >
          <Menuitems />
        </div>}
      </div>
    </div>
  )
}

export default Home
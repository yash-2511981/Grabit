import { filtersArray } from "@/lib/dummy"
import CategoryFilterButton from "./CategoryFilter"
import SwitchModeButton from "./SwitchModeButton"
import Product from "@/components/Product"
import { useAppStore } from "@/store/store"

const Home = () => {
  const { products } = useAppStore()

  return (
    <div className='w-full max-w-7xl mx-auto h-[calc(100vh-150px)] flex flex-col bg-gray-50'>

      {/* Fixed Header - won't scroll */}
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



      {/* Scrollable Products Area Only */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto hide-scrollbar">
          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product, index) => (
                <Product key={product._id || index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
import { filtersArray, productArray } from "@/lib/dummy"
import CategoryFilterButton from "./CategoryFilter"
import SwitchModeButton from "./SwitchModeButton"
import Product from "@/components/Product"

const Home = () => {
  return (
    <div className='w-full sm:max-w-7xl mx-auto h-full flex flex-col px-4 bg-transparent'>
      <div className='h-16 w-full px-2 flex justify-between items-center flex-shrink-0 border-b bg-white/80 backdrop-blur-sm'>
        <div className="gap-2 w-auto flex p-2 overflow-x-auto">
          {filtersArray.map((filter, index) => {
            return (
              <CategoryFilterButton key={index} text={filter.text} value={filter.value} />
            )
          })}
        </div>
        <SwitchModeButton text="Veg Mode" value="veg" />
      </div>

      <div className="flex-1 pt-4 overflow-hidden min-h-0 bg-transparent">
        <div className="h-full overflow-y-auto overflow-x-hidden pt-4 pr-4 pl-4 hide-scrollbar inset-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 pr-4 pl-4 h-[500px]">
            {
              productArray.map((product, index) => (
                <Product key={index} prodcut={product} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
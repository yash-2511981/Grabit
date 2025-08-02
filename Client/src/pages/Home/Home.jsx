import { filtersArray } from "@/lib/dummy"
import CategoryFilterButton from "./CategoryFilter"
import SwitchModeButton from "./SwitchModeButton"

const Home = () => {
  return (
    <div className='w-full sm:max-w-7xl mx-auto flex-1 flex-col flex px-4 space-y-3'>
      <div className='h-12 w-full px-2 flex justify-between items-center'>
        <div className="gap-2 w-auto flex p-2">
          {filtersArray.map((filter, index) => {
            return (
              <CategoryFilterButton key={index} text={filter.text} value={filter.value} />
            )
          })}
        </div>
        <SwitchModeButton text="Veg Mode" value="veg" />
      </div>
      <div className="w-full p-2 flex-1 pt-4 overflow-y-auto">
        <div className="grid-cols-4">
          
        </div>
      </div>
    </div>

  )
}

export default Home

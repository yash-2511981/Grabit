import Loading from "./components/ui/loading"
import Auth from "./pages/Auth/Auth"
import { useAppStore } from "./store/store"

function App() {

  const { loading } = useAppStore()

  return (
    <>
      {loading && <Loading />}
      <Auth />
    </>
  )
}

export default App

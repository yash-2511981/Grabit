import { useEffect } from "react"
import Loading from "./components/ui/loading"
import Auth from "./pages/Auth/Auth"
import { useAppStore } from "./store/store"
import useApi from "./hooks/useApi"
import { GET_CART_ITEMS, GET_PRODUCTS, GET_RESTAURANTS, GET_USER_INFO } from "./lib/constants"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Profile from "./pages/Profile/Profile"
import Orders from "./pages/orders/Orders"

const AuhtRoutes = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/home" /> : children
}

const PrivateRoutes = ({ children }) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/" />
}

const Layout = ({ children }) => {
  const location = useLocation()
  const isAuthPage = location.pathname === "/"

  return <div className="flex flex-col max-h-screen space-y-2">
    {!isAuthPage && <Navbar />}
    {children}
    {!isAuthPage && <Footer />}
  </div>

}

function App() {

  const { loading, setUserInfo, setLoading, setCartItems, setAddresses } = useAppStore()
  const { get } = useApi()



  useEffect(() => {
    const getUserInfo = async () => {

      setLoading(true);

      const result = await get(GET_USER_INFO)
      const cartItems = await get(GET_CART_ITEMS)

      if (cartItems.success) {
        setCartItems(cartItems.data.cartItems)
      }

      if (result.success) {
        setUserInfo(result.data.user)
        setAddresses(result.data?.address)
      }

      setLoading(false)
    }

    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={
              <AuhtRoutes>
                <Auth />
              </AuhtRoutes>
            } />
            <Route path="/home" element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            } />
            <Route path="/profile" element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            } />
            <Route path="/orders" element={
              <PrivateRoutes>
                <Orders />
              </PrivateRoutes>
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App

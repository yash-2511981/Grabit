import { useEffect } from "react"
import Loading from "./components/ui/loading"
import Auth from "./pages/Auth/Auth"
import { useAppStore } from "./store/store"
import useApi from "./hooks/useApi"
import { GET_USER_INFO } from "./lib/constants"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Profile from "./pages/Profile/Profile"

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

  return <div className="flex flex-col min-h-screen space-y-3">
    {!isAuthPage && <Navbar />}
    {children}
    {!isAuthPage && <Footer />}
  </div>

}

function App() {

  const { loading, setUserInfo, setLoading, setAddress } = useAppStore()
  const { get } = useApi()



  useEffect(() => {
    const getUserInfo = async () => {

      setLoading(true);

      const result = await get(GET_USER_INFO)
      if (result.success) {
        setUserInfo(result.data.user)
        setAddress(result.data.address)
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App

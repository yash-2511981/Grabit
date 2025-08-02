import { useNavigate } from "react-router-dom"
import Profile from "./Profile"
import Logo from "./ui/logo"

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full sm:max-w-7xl flex justify-between mx-auto p-2">
            <Logo onClick={() => navigate("/home")} />
            <Profile />
        </div>
    )
}

export default Navbar

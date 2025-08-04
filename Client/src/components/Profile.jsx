import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useApi from "@/hooks/useApi"
import { SIGN_OUT } from "@/lib/constants"
import { useAppStore } from "@/store/store"
import { useNavigate } from "react-router-dom"

export function Profile() {
    const { userInfo, setUserInfo, addresses } = useAppStore()
    const { post } = useApi()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const result = await post(SIGN_OUT, {}, "Logged Out Successfully")
        if (result.success) {
            setUserInfo(null)
            navigate("/")
        }
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-primary hover:bg-yellow-600 hover:text-white text-white font-semibold rounded-full text-2xl h-10 w-10">
                    {userInfo?.firstName?.charAt(0).toUpperCase() ?? "U"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="md:w-56 w-46  bg-white text-black border border-gray-200 shadow-xl rounded-xl mt-2"
                align="end"
            >
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" onClick={() => {
                    navigate("/profile")
                }}>
                    Profile
                    {addresses.length === 0 && (
                        <DropdownMenuShortcut className="bg-red-500 h-4 w-4 rounded-full text-white text-xs flex items-center justify-center ml-auto">
                            !
                        </DropdownMenuShortcut>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                    Cart
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                    Orders
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                    Subscriptions
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile

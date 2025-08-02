import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store"

const Profile = () => {
    const { userInfo } = useAppStore();

    return (
        <div className="w-full sm:max-w-7xl mx-auto p-4 border-2 flex-1">
            <div className="border-b flex gap-3 p-2 items-center">
                <div className="sm:size-15 size-8 text-2xl rounded-full bg-red-500 flex items-center justify-center">
                    <span>{userInfo.firstName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="p-1 flex items-center justify-between w-full">
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-xl font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                        <p className="text-muted-foreground">{userInfo.email}</p>
                    </div>
                    <div>
                        <Button >Update</Button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Profile

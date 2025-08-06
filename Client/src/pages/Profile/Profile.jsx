import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import { EditIcon, PlusIcon, Shield, TriangleAlert, User, MapPin } from "lucide-react";
import UpdateProfileForm from "./Forms/UpdateProfile";
import AddaddressForm from "./Forms/Addaddress";
import ChangePasswordForm from "./Forms/ChangePassword";
import { useState } from "react";
import ManageAddress from "./Forms/ManageAddress";

const Modal = ({ modal, setShowModal }) => {
    if (modal === "update") return <UpdateProfileForm setShowModal={setShowModal} />
    if (modal === "addaddress") return <AddaddressForm setShowModal={setShowModal} />
    if (modal === "changepassword") return <ChangePasswordForm setShowModal={setShowModal} />
    if (modal === "manageaddress") return <ManageAddress setShowModal={setShowModal} />
}

const Profile = () => {
    const { userInfo, addresses } = useAppStore();
    const [modal, setShowModal] = useState("");


    return (
        <div className="w-full sm:max-w-4xl mx-auto p-4 flex-1 space-y-3">
            {
                modal != null && <Modal modal={modal} setShowModal={setShowModal} />
            }

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <p className="text-muted-foreground mt-1">Manage your personal information and settings</p>
            </div>

            {/* User Info Section */}
            <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                        <User className="h-5 w-5" />
                        <h2 className="text-lg font-semibold">Personal Information</h2>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 text-2xl text-amber-600 rounded-full bg-gradient-to-br from-yellow-200 to-amber-200 flex items-center justify-center font-semibold shadow-sm">
                            <span>{userInfo.firstName?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold text-gray-900">
                                {`${userInfo.firstName} ${userInfo.lastName}`}
                            </p>
                            <p className="text-muted-foreground text-sm">{userInfo.email}</p>
                            {userInfo.phone && (
                                <p className="text-muted-foreground text-sm">{userInfo.phone}</p>
                            )}
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowModal("update")}>
                        <EditIcon className="h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Address Section */}
            <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-5 w-5" />
                        <h2 className="text-lg font-semibold">Addresses</h2>
                    </div>
                    <Button size="sm" className="gap-2" onClick={() => setShowModal("addaddress")}>
                        <PlusIcon className="h-4 w-4" />
                        Add Address
                    </Button>
                </div>

                {addresses.length === 0 ? (
                    <div className="border border-red-200 bg-red-50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <TriangleAlert className="text-red-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-red-800 font-medium text-sm">No addresses added</p>
                                <p className="text-red-700 text-sm mt-1">
                                    Please add at least one address to complete your profile setup
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
                                    </p>
                                    <p className="text-sm text-muted-foreground">Manage your delivery locations</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setShowModal("manageaddress")}>
                                <EditIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Password & Security Section */}
            <div className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-900">Password & Security</h2>
                            <p className="text-muted-foreground text-sm">Keep your account secure</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowModal("changepassword")}>
                        <Shield className="h-4 w-4" />
                        Change Password
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
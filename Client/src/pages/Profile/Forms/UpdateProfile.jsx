import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useApi from '@/hooks/useApi'
import { UPDATE_PERSONAL_INFO } from '@/lib/constants'
import { useAppStore } from '@/store/store'
import { X } from 'lucide-react'
import { useState } from 'react'

const UpdateProfileForm = ({ setShowModal }) => {
    const { patch } = useApi()
    const { setUserInfo, userInfo } = useAppStore()

    const [formValue, setFormValue] = useState({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        contact: userInfo.contact || ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue(prevValue => ({ ...prevValue, [name]: value }))
    }

    const handleUpdateData = async () => {
        try {
            setShowModal(false)
            const result = await patch(UPDATE_PERSONAL_INFO, formValue, "Personal Details Updated Successfully")
            if (result.success) {
                setUserInfo(result.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50'>
            <div className='p-6 relative rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300'>
                <X 
                    onClick={() => setShowModal(false)} 
                    className='absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full sm:size-10 size-8 transition-all duration-200 p-2 cursor-pointer hover:scale-110 shadow-lg z-10' 
                />
                <Card className="p-6 min-w-md w-full bg-white/95 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                            Update Profile Details
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600 mt-2">
                            Fill details and click on update to update details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-5'>
                                <div className='space-y-2'>
                                    <Label htmlFor="fname" className="text-sm font-medium text-gray-700">
                                        First Name
                                    </Label>
                                    <Input 
                                        id="fname" 
                                        name="firstName" 
                                        value={formValue?.firstName} 
                                        onChange={handleInputChange}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor="lname" className="text-sm font-medium text-gray-700">
                                        Last Name
                                    </Label>
                                    <Input 
                                        id="lname" 
                                        name="lastName" 
                                        value={formValue?.lastName} 
                                        onChange={handleInputChange}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
                                        Contact No
                                    </Label>
                                    <Input 
                                        id="contact" 
                                        name="contact" 
                                        value={formValue?.contact} 
                                        onChange={handleInputChange}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200"
                                    />
                                </div>
                                <Button 
                                    onClick={handleUpdateData} 
                                    type="button"
                                    className="h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-2"
                                >
                                    Apply Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UpdateProfileForm
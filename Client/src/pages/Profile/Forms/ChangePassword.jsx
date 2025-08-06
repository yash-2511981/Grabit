import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useApi from '@/hooks/useApi'
import { CHANGE_PASSWORD } from '@/lib/constants'
import { X } from 'lucide-react'
import { useState } from 'react'

const ChangePasswordForm = ({ setShowModal }) => {

    const { patch } = useApi()

    const [formValue, setFormValue] = useState({
        oldpassword: "",
        newpassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue(prevValue => ({ ...prevValue, [name]: value }))
    }

    const handleChangePassword = async () => {
        try {
            setShowModal(false)
            await patch(CHANGE_PASSWORD, formValue, "Password Updated Successfully")
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
                            Change Password
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600 mt-2">
                            Fill correct details to update the password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-6'>
                                <div className='space-y-2'>
                                    <Label htmlFor="oldpassword" className="text-sm font-medium text-gray-700">
                                        Old Password
                                    </Label>
                                    <Input 
                                        id="oldpassword" 
                                        name="oldpassword" 
                                        value={formValue.oldpassword} 
                                        onChange={handleInputChange} 
                                        type="password"
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor="newpassword" className="text-sm font-medium text-gray-700">
                                        New Password
                                    </Label>
                                    <Input 
                                        id="newpassword" 
                                        name="newpassword" 
                                        value={formValue.newpassword} 
                                        onChange={handleInputChange} 
                                        type="password"
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200"
                                    />
                                </div>
                                <Button 
                                    onClick={handleChangePassword} 
                                    type="button"
                                    className="h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Change Password
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ChangePasswordForm
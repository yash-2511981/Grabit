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
        <div className='inset-0 flex items-center justify-center backdrop-blur-xs absolute'>
            <div className='p-2 relative rounded-lg'>
                <X onClick={() => setShowModal(false)} className='absolute top-1 right-1 bg-amber-500 rounded-full sm:size-8 size-6 transition-all duration-100 p-1' />
                <Card className="p-4 max-w-md w-md">
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Fill correct details to update the password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-6'>
                                <div className='grid gap-2'>
                                    <Label htmlFor="oldpassword">Old Password</Label>
                                    <Input id="oldpassword" name="oldpassword" value={formValue.oldpassword} onChange={handleInputChange} type="password" />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor="newpassword">New Password</Label>
                                    <Input id="newpassword" name="newpassword" value={formValue.newpassword} onChange={handleInputChange} type="password" />
                                </div>
                                <Button onClick={handleChangePassword} type="button">Change Password</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ChangePasswordForm

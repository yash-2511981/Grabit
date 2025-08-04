import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useApi from '@/hooks/useApi'
import { UPDATE_PERSONAL_INFO } from '@/lib/constants'
import { useAppStore } from '@/store/store'
import { Flag, X } from 'lucide-react'
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
            const result = await patch(UPDATE_PERSONAL_INFO, formValue, "Personal Details Updated Succesfully")
            if (result.success) {
                setUserInfo(result.data.user)
            }
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
                        <CardTitle>Update Profile Details</CardTitle>
                        <CardDescription>Fill details and click on update to update details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-6'>
                                <div className='grid gap-2'>
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input id="fname" name="firstName" value={formValue?.firstName} onChange={handleInputChange} />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input id="lname" name="lastName" value={formValue?.lastName} onChange={handleInputChange} />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor="contact">Contact No</Label>
                                    <Input id="contact" name="contact" value={formValue?.contact} onChange={handleInputChange} />
                                </div>
                                <Button onClick={handleUpdateData} type="button">Apply Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UpdateProfileForm

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

const UpdateProfileForm = ({ setShowModal }) => {
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
                                    <Label htmlfor="fname">First Name</Label>
                                    <Input id="fname" name="firstName" />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlfor="lname">Last Name</Label>
                                    <Input id="lname" name="lastName" />
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlfor="contact">Contact No</Label>
                                    <Input id="contact" name="contact" />
                                </div>
                                <Button>Apply Changes</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UpdateProfileForm

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { } from '@/components/ui/label'
import { X } from 'lucide-react'

const AddaddressForm = ({ setShowModal }) => {
    return (
        <div className='inset-0 flex items-center justify-center backdrop-blur-xs absolute'>
            <div className='p-2 relative rounded-lg'>
                <X onClick={() => setShowModal(false)} className='absolute top-1 right-1 bg-amber-500 rounded-full sm:size-8 size-6 transition-all duration-100 p-1' />
                <Card className="p-4 max-w-md w-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Add address</CardTitle>
                        <CardDescription>Kindly fill the correct details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-6'>
                                <div className='grid gap-2'>
                                    <Input id="roomNo" name="roomNo" placeholder="Room No" />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="buildingName" name="buildingName" placeholder="Building Name/ No." />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="area" name="area" type="text" placeholder="Area" />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="landmark" name="landmark" type="text" placeholder="Landmark" />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="pincode" name="pincode" type="number" placeholder="Pincode" />
                                </div>
                                <Button>Add</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddaddressForm

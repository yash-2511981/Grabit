import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { } from '@/components/ui/label'
import useApi from '@/hooks/useApi'
import { ADD_ADDRESS } from '@/lib/constants'
import { useAppStore } from '@/store/store'
import { X } from 'lucide-react'
import { useState } from 'react'

const AddaddressForm = ({ setShowModal }) => {

    const { post } = useApi()
    const { setAddress } = useAppStore()

    const [formValue, setFormValue] = useState({
        roomNo: "",
        buildingName: "",
        area: "",
        landmark: "",
        pincode: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue(prevValue => ({ ...prevValue, [name]: value }))
    }

    const handleAddAddress = async () => {
        try {
            setShowModal(false)
            const result = await post(ADD_ADDRESS, formValue, "Address Added SuccessFully")
            if (result.success) {
                setAddress(result.data)
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
                        <CardTitle className="text-xl font-semibold">Add address</CardTitle>
                        <CardDescription>Kindly fill the correct details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-6'>
                                <div className='grid gap-2'>
                                    <Input id="roomNo" name="roomNo" placeholder="Room No" onChange={handleInputChange} value={formValue.roomNo} />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="buildingName" name="buildingName" placeholder="Building Name/ No." onChange={handleInputChange} value={formValue.buildingName} />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="area" name="area" type="text" placeholder="Area" onChange={handleInputChange} value={formValue.area} />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="landmark" name="landmark" type="text" placeholder="Landmark" onChange={handleInputChange} value={formValue.landmark} />
                                </div>
                                <div className='grid gap-2'>
                                    <Input id="pincode" name="pincode" type="number" placeholder="Pincode" onChange={handleInputChange} value={formValue.pincode} />
                                </div>
                                <Button type="button" onClick={handleAddAddress}>Add</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddaddressForm

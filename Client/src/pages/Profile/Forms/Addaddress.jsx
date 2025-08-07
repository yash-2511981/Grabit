import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useApi from '@/hooks/useApi'
import { ADD_ADDRESS } from '@/lib/constants'
import { useAppStore } from '@/store/store'
import { X } from 'lucide-react'
import { useState } from 'react'

const AddaddressForm = ({ setShowModal }) => {

    const { post } = useApi()
    const { addAddress } = useAppStore()

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
            const result = await post(ADD_ADDRESS, formValue, "Address Added Successfully")
            if (result.success) {
                addAddress(result.data)
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
                            Add Address
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600 mt-2">
                            Kindly fill the correct details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className='flex flex-col gap-4'>
                                <div className='space-y-1'>
                                    <Input 
                                        id="roomNo" 
                                        name="roomNo" 
                                        placeholder="Room No" 
                                        onChange={handleInputChange} 
                                        value={formValue.roomNo}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200 placeholder:text-gray-400"
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <Input 
                                        id="buildingName" 
                                        name="buildingName" 
                                        placeholder="Building Name/ No." 
                                        onChange={handleInputChange} 
                                        value={formValue.buildingName}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200 placeholder:text-gray-400"
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <Input 
                                        id="area" 
                                        name="area" 
                                        type="text" 
                                        placeholder="Area" 
                                        onChange={handleInputChange} 
                                        value={formValue.area}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200 placeholder:text-gray-400"
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <Input 
                                        id="landmark" 
                                        name="landmark" 
                                        type="text" 
                                        placeholder="Landmark" 
                                        onChange={handleInputChange} 
                                        value={formValue.landmark}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200 placeholder:text-gray-400"
                                    />
                                </div>
                                <div className='space-y-1'>
                                    <Input 
                                        id="pincode" 
                                        name="pincode" 
                                        type="number" 
                                        placeholder="Pincode" 
                                        onChange={handleInputChange} 
                                        value={formValue.pincode}
                                        className="h-12 rounded-lg border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all duration-200 placeholder:text-gray-400"
                                    />
                                </div>
                                <Button 
                                    type="button" 
                                    onClick={handleAddAddress}
                                    className="h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-4"
                                >
                                    Add Address
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AddaddressForm
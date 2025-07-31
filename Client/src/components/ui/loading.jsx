import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='inset-0 bg-transparent fixed z-50 flex items-center justify-center backdrop-blur-sm'>
            <Loader2 className='animate-spin h-20 w-25 text-[#f2ac00]' />
        </div>
    )
}

export default Loading

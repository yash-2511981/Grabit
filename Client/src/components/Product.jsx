import React from 'react'

const Product = ({ prodcut }) => {
    return (
        <div className="border-2 border-amber-200 bg-gradient-to-br from-amber-100 to-yellow-200 h-[200px] w-full rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] flex items-center justify-center">
            <span className="text-amber-600 font-medium">{prodcut.name}</span>
        </div>
    )
}

export default Product

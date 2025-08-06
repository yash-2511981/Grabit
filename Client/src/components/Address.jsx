const Address = ({ address }) => {
    return (
        <div className="max-w-md border rounded-xl p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm hover:shadow-md">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                {`${address.roomNo}, ${address.buildingName}, ${address.area}, ${address.landmark} ${address.pincode}`}
            </p>
        </div>
    )
}

export default Address
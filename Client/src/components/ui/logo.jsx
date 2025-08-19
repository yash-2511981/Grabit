import logo from '/logo.png'

const Logo = ({ onClick }) => {
    return (
        <div className="flex items-center space-x-1 cursor-pointer" onClick={onClick}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" />
            </div>
            <span className="font-bold text-2xl text-gray-800">Grabit</span>
        </div>
    )
}

export default Logo

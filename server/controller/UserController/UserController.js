import { AddressModel } from "../../model/AddressModel.js"
import { OrderModel } from "../../model/OrderModel.js"
import { ProductModel } from "../../model/ProductModel.js"
import { UserModel } from "../../model/UserModel.js"
import { SubscriptionModel } from "../../model/SubscriptionModel.js"


//Get User Info end point
//step 1 : extract the userinfo from req.user.
//step 2 : fetch user data from database and if user not present then send not found response
//step 3 : structure the response and send back to the user.
export const getUserInfo = async (req, res) => {
    const { userId } = req.user

    try {
        const user = await UserModel.findById(userId)

        if (!user)
            return res.status(404).send("user not found! try to login again or sign up")


        const address = await AddressModel.find({ user: userId })
        const orderDtails = await OrderModel.find({ user: userId }).populate("product", "name description")
        const cartDetails = await ProductModel.find({
            _id: {
                $in: user.cart.map(c => c.product)
            }
        })

        const { password, ...userDet } = user.toObject()

        res.status(200).json({
            user: {
                ...userDet
            },
            address,
            orderDtails,
            cartDetails,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}



const makeOrder = async (req, res) => {
    const { userId } = req.user
}
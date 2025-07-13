import { AddressModel } from "../../model/AddressModel.js"
import { OrderModel } from "../../model/OrderModel.js"
import { ProductModel } from "../../model/ProductModel.js"
import { UserModel } from "../../model/UserModel.js"


//Get User Info end point
//step 1 : extract the userinfo from req.user.
//step 2 : fetch user data from database and if user not present then send not found response
//step 3 : structure the response and send back to the user.
export const getUserInfo = async (req, res) => {
    const { id } = req.data

    try {
        const user = await UserModel.findById(id)

        if (!user)
            return res.status(404).send("user not found! try to login again or sign up")


        const address = await AddressModel.find({ user: id })
        const orderDtails = await OrderModel.find({ user: id }).populate("product", "name description")
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



export const addToCart = async (req, res) => {
    try {
        const { id } = req.data;
        let { product, quantity } = req.body;

        quantity = quantity && quantity > 0 ? quantity : 1;

        const isProductPresent = await ProductModel.findById(product);
        if (!isProductPresent) {
            return res.status(404).json({ error: "Product not found" });
        }

        const user = await UserModel.findByIdAndUpdate(id, {
            $push: {
                cart: { product, quantity }
            }
        });

        res.status(200).json({ user })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

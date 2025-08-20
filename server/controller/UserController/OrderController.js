import { OrderModel } from "../../model/OrderModel.js";
import { UserModel } from "../../model/UserModel.js";

export const createOrder = async (req, res) => {
    const { id } = req.data;
    const { orderProducts, amount, deliveryCharge, orderAddress, paymentMode, isOrderFromCart, platFormFee, gst } = req.body

    try {
        const orderOptions = {
            user: id,
            amount,
            deliveryCharge,
            products: orderProducts,
            address: orderAddress,
            paymentMode,
            orderStatus: paymentMode === "online" ? "pending" : "confirm",
            platFormFee,
            gst,
        }

        const order = await (await OrderModel.create(orderOptions)).populate({
            path: "products.product",
            module: "product"
        })

        if (isOrderFromCart) {
            await UserModel.findByIdAndUpdate(id, { cart: [] })
        }

        if (paymentMode === "online") {
            //razorpay order creation
        }

        res.status(200).json({ order })

    } catch (error) {
        console.log(error)
        res.status(500).send("Server error.Try again later")
    }

}



export const getOrderDetails = async (req, res) => {
    const { id } = req.data
    try {
        const orders = await OrderModel.find({ user: id }).populate({
            path: "products.product",
            module: "product"
        })

        const pendingOrders = orders.filter((order) => (order.orderStatus !== "delivered" || order.orderStatus !== "cancled"))
        const completedOrders = orders.filter((order) => (order.orderStatus === "delivered" || order.orderStatus === "cancled"))
        res.status(200).json({ pendingOrders, completedOrders })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error.Try again later")
    }
}   
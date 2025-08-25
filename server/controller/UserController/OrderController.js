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
            model: "product",
        },).sort({ createdAt: -1 })

        const pendingOrders = orders.filter((order) => (order.orderStatus !== "delivered" && order.orderStatus !== "cancelled"))
        const completedOrders = orders.filter((order) => (order.orderStatus === "delivered" || order.orderStatus === "cancelled"))
        res.status(200).json({ pendingOrders, completedOrders })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error.Try again later")
    }
}

export const cancelOrder = async (req, res) => {
    const { id } = req.data;
    const { orderId } = req.body
    if (!orderId) return res.status(401).send("Order Id is required")

    try {
        const order = await OrderModel.findOneAndUpdate({ _id: orderId, user: id }, { $set: { orderStatus: "cancelled" } })

        if (!order) return res.status(404).send("Order not found or not authorized to update")

        res.status(200).json("Order Cancelled")
    } catch (error) {
        console.log(error)
        res.status(200).send("Server error.Try again later.")
    }
}


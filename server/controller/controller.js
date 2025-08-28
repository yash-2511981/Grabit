import { ProductModel } from "../model/ProductModel.js"
import { RestaurantModel } from "../model/RestaurantModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ products })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error,Try again later" })
    }
}

export const updateOrderStatus = async (req, res) => {
    const { orderId, orderStatus } = req.body
    try {
        const order = await OrderModel.findByIdAndUpdate(orderId, { orderStatus })
        res.status(200).send(`Order ${orderStatus}`)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error.Try again later")
    }
}

export const updatePaymentStatus = async (req, res) => {
    const { orderId, paymentStatus } = req.body
    try {
        await OrderModel.findByIdAndUpdate(orderId, { orderStatus })
        res.status(200).send(`Payment status updated to ${paymentStatus}`)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error.Try again later")
    }
}

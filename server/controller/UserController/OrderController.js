import { OrderModel } from "../../model/OrderModel.js";

export const createOrder = async (req, res) => {
    const { id } = req.data;
    const { orderItems, amount } = req.body

    try {
        const newOrder = await OrderModel.create({ user: id, amount, })
        res.status(200).json({ id: newOrder._id })

    } catch (error) {
        console.log(error)
        res.status(500).send("Server error.Try again later")
    }

}

export const deleteOrder = async () => {

}

export const udpateOrder = async () => {

}

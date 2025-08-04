import { ProductModel } from "../model/ProductModel.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ products })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error,Try again later" })
    }
}
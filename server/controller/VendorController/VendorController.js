import { validationResult } from "express-validator"
import { ProductModel } from "../../model/ProductModel.js";
import { RestaurantModel } from "../../model/RestaurantModel.js";


export const addProduct = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty())
            return res.status(400).json({ error: error.array() })

        const restaurant = await RestaurantModel.findById(req.data.id)
        if (!restaurant)
            return res.status(404).json({ error: "Restaurant is not valid" })

        const { name, description, price, category, imageUrl } = req.body;


        const isProductAvailable = await ProductModel.findOne({ name, restaurant });

        if (isProductAvailable)
            return res.status(400).json({ error: "Product is already in menu" })

        await ProductModel.create({
            name, description, price, category, restaurant, imageUrl
        })

        res.status(200).json({ message: "Product added successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error,Try again later" })
    }
}   
import { validationResult } from "express-validator"
import { AddressModel } from "../../model/AddressModel.js"
import { ProductModel } from "../../model/ProductModel.js"
import { UserModel } from "../../model/UserModel.js"
import bcrypt from 'bcrypt'
import { RestaurantModel } from "../../model/RestaurantModel.js"
import mongoose from "mongoose"


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


        const { password, cart, ...userDet } = user.toObject()

        res.status(200).json({
            user: {
                ...userDet
            },
            address,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}


export const updatePersonalInfo = async (req, res) => {
    const { id } = req.data
    const { firstName, lastName, contact } = req.body
    if (!firstName || !lastName || !contact) {
        return res.status(400).send("Please fill all the details")
    }

    try {
        const user = await UserModel.findByIdAndUpdate(id, { firstName, lastName, contact }, { new: true })
        console.log(user)
        if (!user) {
            return res.status(401).send("Unauthorized request")
        }

        const { password, ...userDet } = user.toObject()

        res.status(200).json({
            user: { ...userDet }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const changePassword = async (req, res) => {
    const { id } = req.data;
    const { oldpassword, newpassword } = req.body
    if (!oldpassword || !newpassword) {
        return res.status(400).send("Provide a correct details")
    }

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(401).send("Unauthorized request")
        }

        const { password } = user.toObject()

        const isOldPasswordMatching = await bcrypt.compare(oldpassword, password)
        console.log(isOldPasswordMatching)
        if (isOldPasswordMatching) {

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(newpassword, salt)

            await UserModel.findByIdAndUpdate(id, { password: hashedPass })

            res.status(200).json("password updated")
        } else {
            return res.status(400).send("Old password is not matching")
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const addAddress = async (req, res) => {
    const { id } = req.data;
    const { roomNo, buildingName, landmark, pincode, area } = req.body
    const error = await validationResult(req)
    if (!error.isEmpty()) {
        console.log(error.array())
        return res.status(400).send(error.array()[0].msg)
    }

    try {
        const address = await AddressModel.create({ user: id, roomNo, buildingName, landmark, pincode, area })

        res.status(200).json({ address })

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error.Try again later")
    }
}

export const getProducts = async (req, res) => {
    const { id } = req.data;
    try {
        const user = await UserModel.findById(id).select("pincode")

        const restaurants = await RestaurantModel.find({ pincode: user.pincode }).select("_id")
        if (restaurants.length === 0) {
            return res.status(200).send("There is no Restaurant near you")
        }

        const restaurantIds = restaurants.map(r => r._id)

        const products = await ProductModel.find({ restaurant: { $in: restaurantIds } })

        res.status(200).json({ products })

    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error.Try again later")
    }
}

export const getCartItems = async (req, res) => {
    const { id } = req.data

    try {
        const user = await UserModel.findById(id)

        if (!user) {
            return res.status(401).send("Unauthorized request")
        }

        const { cart } = user.toObject()

        const cartItems = await Promise.all(
            cart.map(async (item) => {
                const product = await ProductModel.findById(item.product)
                return { product, quantity: item.quantity }
            })
        )

        res.status(200).json({ cartItems })
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error.Try again later")
    }
}

export const addToCart = async (req, res) => {
    try {
        const { id } = req.data;
        let { productId } = req.body;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await UserModel.findByIdAndUpdate(id, {
            $push: {
                cart: { product: product.id }
            }
        });

        res.status(200).json({ product })

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteCartItem = async (req, res) => {
    const { id } = req.data;
    const { productId } = req.body
    try {
        await UserModel.findByIdAndUpdate(id, {
            $pull: {
                cart: { product: productId }
            }
        })

        res.status(200).send()

    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error. Try again later")
    }
}
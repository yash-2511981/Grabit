import { validationResult } from "express-validator"
import { RestaurantModel } from "../../model/RestaurantModel.js"
import bcrypt from 'bcrypt'
import { createToken, validateTill } from "../../lib/utils.js"
import { BlackListTokenModel } from "../../model/BalckListTokenModel.js"
import jwt from 'jsonwebtoken'

export const registerRestaurant = async (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty())
        return res.status(404).json({ error: error.array() })

    const { name, email, phone, address, pincode, category, password } = req.body

    const isEmailUsed = await RestaurantModel.findOne({ email });
    if (isEmailUsed)
        return res.status(404).json({ error: "Email already exist" })

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt)

    try {
        const restaurant = await RestaurantModel.create({
            name, email, address, category, phone, pincode, password: newPass
        })

        res.cookie("jwt", createToken(restaurant._id), {
            httpOnly: true,
            maxAge: validateTill,
            secure: true,
            sameSite: "None"
        })

        const { password, ...rest } = restaurant.toObject()

        res.status(200).json({
            restaurant: {
                ...rest
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error, Try again later" })
    }
}


export const restaurantLogin = async (req, res) => {
    const error = await validationResult(req);

    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    const { email, password } = req.body


    try {
        const restaurant = await RestaurantModel.findOne({ email })

        const isCorrectUser = await bcrypt.compare(password, restaurant.password)
        if (isCorrectUser) {
            res.cookie("jwt", createToken(restaurant._id), {
                httpOnly: true,
                maxAge: validateTill,
                secure: true,
                sameSite: "None"
            })

            const { password, ...rest } = restaurant.toObject();

            res.status(200).json({
                restaurant: {
                    ...rest
                }
            })
        } else {
            return res.status(401).send("incorrect combination of username/password")
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error, try again letter")
    }
}

export const restaurantLogout = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.sendStatus(204).json({ error: "Unauthorized access" })

        const isTokenExpired = await BlackListTokenModel.findOne({ token })
        if (isTokenExpired)
            return res.status(401).json({ message: "something went wrong, try again later..." })

        const { exp } = jwt.decode(token)
        const expiry = new Date(exp * 1000);

        await BlackListTokenModel.create({ token, expiresAt: expiry })

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        })

        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}
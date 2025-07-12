import { validationResult } from "express-validator"
import { UserModel } from "../../model/UserModel.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { createToken } from "../../lib/utils.js"
import jwt from "jsonwebtoken"
import { BlackListTokenModel } from "../../model/BalckListTokenModel.js"

dotenv.config()
const validateTill = 3 * 24 * 60 * 60 * 1000


export const register = async (req, res) => {
    const error = await validationResult(req)

    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    const { email, firstName, lastName, mobile, preference, password } = req.body

    const isUserPresent = await UserModel.findOne({ email: email })
    if (isUserPresent)
        return res.status(400).json({ error: "email is already register try to sign in" })

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt)

    try {
        const user = await UserModel.create({
            email, firstName, lastName, mobile, preference, password: newPass
        })


        res.cookie("jwt", createToken(user._id, user.email, secrete), {
            httpOnly: true,
            maxAge: validateTill,
            secure: true,
            sameSite: "None"
        })

        const { password, ...userDet } = user.toObject()

        res.status(200).json({
            user: {
                ...userDet
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }

}


export const signIn = async (req, res) => {
    const error = await validationResult(req);

    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    const { email, password } = req.body


    try {
        const user = await UserModel.findOne({ email })

        const isCorrectUser = await bcrypt.compare(password, user.password)
        if (isCorrectUser) {
            res.cookie("jwt", createToken(user._id, user.email, secrete), {
                httpOnly: true,
                maxAge: validateTill,
                secure: true,
                sameSite: "None"
            })

            const { password, ...userDet } = user.toObject();

            res.status(200).json({
                user: {
                    ...userDet
                }
            })
        } else {
            return res.status(401).json({ message: "incorrect combination of username/password" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error, try again letter" })
    }
}


export const signUp = async (req, res) => {
    const token = req.cookies.jwt;
    if (!token)
        return res.sendStatus(204)

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
}
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { BlackListTokenModel } from "../model/BalckListTokenModel.js"
dotenv.config()
const secrete = process.env.JWT_SECRETE

export const createToken = (userId, email) => {
    return jwt.sign({ email, userId }, secrete, { expiresIn: "3d" })
}

export const jwtVerify = async (req, res, next) => {
    const token = req.cookies.twt;

    const isTokenExpired = BlackListTokenModel.findOne({ token })

    if (isTokenExpired)
        return res.status(401).json({ message: "Unable to process your request try again later" })

    try {
        const decode = jwt.verify(token, secrete);

        req.user = decode

        next();
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}
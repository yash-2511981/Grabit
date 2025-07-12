import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { BlackListTokenModel } from "../model/BalckListTokenModel.js"
dotenv.config()
const secrete = process.env.JWT_SECRETE

export const createToken = (userId) => {
    return jwt.sign({ userId }, secrete, { expiresIn: "3d" })
}

//jwt token verifier to prevent the unauthorized access
//step 1 : fetch the token from request
//step 2 : check token is present in expired list.
//step 3 : verify the token and attached the decoded data to req as user.
export const jwtVerify = async (req, res, next) => {
    const token = req.cookies.jwt;

    const isTokenExpired = await BlackListTokenModel.findOne({ token })

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


export const setMealTime = (hours, minutes) => {
    const date = new Date()
    date.setHours(hours)
    date.setMinutes(minutes)

    return date
}
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { AdminModel } from "../../model/AdminModel.js";
import { validationResult } from "express-validator";
import { createToken, validateTill } from "../../lib/utils.js";
import { BlackListTokenModel } from "../../model/BalckListTokenModel.js";

export const makeRegister = async (req, res) => {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const newpass = await bcrypt.hash(password, salt)

    const createAdmin = await AdminModel.create({ email, password: newpass })

    res.status(200).json({
        createAdmin
    })
}


export const adminLogin = async (req, res) => {
    const error = await validationResult(req);

    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    const { email, password } = req.body


    try {
        const admin = await AdminModel.findOne({ email })

        const isCorrectUser = await bcrypt.compare(password, admin.password)
        if (isCorrectUser) {
            res.cookie("jwt", createToken(admin._id), {
                httpOnly: true,
                maxAge: validateTill,
                secure: true,
                sameSite: "None"
            })

            res.status(200).json({ message: "logged in Successfully" })
        } else {
            return res.status(401).json({ error: "incorrect combination of username/password" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error, try again letter")
    }
}


export const admingLogout = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}
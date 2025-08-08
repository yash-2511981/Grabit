import { validationResult } from "express-validator"
import { UserModel } from "../../model/UserModel.js"
import bcrypt from 'bcrypt'
import { createToken, validateTill } from "../../lib/utils.js"
import jwt from "jsonwebtoken"
import { BlackListTokenModel } from "../../model/BalckListTokenModel.js"

//user registration end point
//step 1 : check there is no validation errors present
//step 2 : check email id is already registered or not.
//step 3 : generate the hash password and store the user details in database.
//step 4 : create a jwt toke and send as cookie into res with expiry.
//step 5 : send user details without password as response payload.
export const register = async (req, res) => {
    const error = await validationResult(req)

    if (!error.isEmpty()) {
        console.log(error.array())
        return res.status(400).send(error.array()[0].msg)
    }

    const { email, firstName, lastName, contact, password } = req.body

    const isUserPresent = await UserModel.findOne({ email })
    if (isUserPresent)
        return res.status(400).send("email is already register try to sign in")

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt)

    try {
        const user = await UserModel.create({
            email, firstName, lastName, contact, password: newPass
        })


        res.cookie("jwt", createToken(user._id), {
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

//SignIn end point
//step 1 : check for validation erros
//step 2 : extract the password from request and user details from database.
//step 3 : compare the the both password.
//step 4 : if correct then send jwt token and user details in response else send appropriate payload to user
export const signIn = async (req, res) => {
    const error = await validationResult(req);

    if (!error.isEmpty())
        return res.status(400).json({ error: error.array() })

    const { email, password } = req.body


    try {
        const user = await UserModel.findOne({ email })

        if (!user)
            return res.status(404).send("Unauthorized")

        const isCorrectUser = await bcrypt.compare(password, user.password)
        if (isCorrectUser) {
            res.cookie("jwt", createToken(user._id), {
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
            return res.status(401).send("incorrect combination of username/password")
        }

    } catch (error) {
        console.log(error)
        return res.status(500).sebd("Internal server error, try again letter")
    }
}

//signUp end point
//step 1 : get the token from req and check it is present in the blacklisted token list.
//step 2 : decode the token and destructure the exp out of it
//step 3 : add this token inside blacklisted token with expiry time as exp so it will get removed after expiration.
//step 4 : clear the cookie from response send status code 200
export const signOut = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.sendStatus(204)

        const isTokenExpired = await BlackListTokenModel.findOne({ token })
        if (isTokenExpired)
            return res.status(401).send("something went wrong, try again later...")

        const { exp } = jwt.decode(token)
        const expiry = new Date(exp * 1000);

        await BlackListTokenModel.create({ token, expiresAt: expiry })

        res.clearCookie("jwt", {
            httpOnly: true,
        sameSite: "None",
            secure: true,
        })

        res.status(200).send("Logged Out Successfully");
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}
import { Router } from "express";
import { register, signIn, signUp } from "../../controller/UserController/AuthController.js";
import { loginValidation, registerValidation } from "../../middleware/AuthMiddleware.js";
import { jwtVerify } from "../../lib/utils.js";
import { getUserInfo } from "../../controller/UserController/UserController.js";

const userRouter = Router();

//authentication routes
userRouter.post("/signIn", loginValidation, signIn)
userRouter.post("/register", registerValidation, register)
userRouter.post("/signUp", signUp)

//other routes
userRouter.get("/get-user-info", jwtVerify, getUserInfo)

export default userRouter
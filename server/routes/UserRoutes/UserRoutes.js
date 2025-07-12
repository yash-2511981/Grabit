import { Router } from "express";
import { register, signIn, signUp } from "../../controller/UserController/AuthController.js";
import { loginValidation, registerValidation } from "../../middleware/AuthMiddleware.js";

const userRouter = Router();

userRouter.post("/signIn", loginValidation, signIn)
userRouter.post("/register", registerValidation, register)
userRouter.post("/signUp", signUp)

export default userRouter
import { Router } from "express";
import { register, signIn, signOut } from "../../controller/UserController/AuthController.js";
import { loginValidation, registerValidation } from "../../middleware/AuthMiddleware.js";
import { jwtVerify } from "../../lib/utils.js";
import { addToCart, getUserInfo } from "../../controller/UserController/UserController.js";
import { getProducts } from "../../controller/controller.js";

const userRouter = Router();

//authentication routes
userRouter.post("/signIn", loginValidation, signIn)
userRouter.post("/signUp", registerValidation, register)
userRouter.post("/signOut", signOut)

//other routes
userRouter.get("/get-user-info", jwtVerify, getUserInfo)
userRouter.get("/get-products", jwtVerify, getProducts);

userRouter.post("/add-to-cart", jwtVerify, addToCart);

export default userRouter
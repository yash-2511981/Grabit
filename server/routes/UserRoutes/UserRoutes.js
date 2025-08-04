import { Router } from "express";
import { register, signIn, signOut } from "../../controller/UserController/AuthController.js";
import { addressValidations, loginValidation, registerValidation } from "../../middleware/AuthMiddleware.js";
import { jwtVerify } from "../../lib/utils.js";
import { addAddress, addToCart, changePassword, getUserInfo, updatePersonalInfo } from "../../controller/UserController/UserController.js";
import { getAllProducts } from "../../controller/controller.js";

const userRouter = Router();

//authentication routes
userRouter.post("/signIn", loginValidation, signIn)
userRouter.post("/signUp", registerValidation, register)
userRouter.post("/signOut", signOut)

//other routes
userRouter.get("/get-user-info", jwtVerify, getUserInfo)
userRouter.get("/get-products", jwtVerify, getAllProducts);

//profile related routes
userRouter.patch("/update-info", jwtVerify, updatePersonalInfo)
userRouter.patch("/change-password", jwtVerify, changePassword)
userRouter.post("/add-address", jwtVerify, addressValidations, addAddress)

userRouter.post("/add-to-cart", jwtVerify, addToCart);

export default userRouter
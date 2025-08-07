import { Router } from "express";
import { register, signIn, signOut } from "../../controller/UserController/AuthController.js";
import { addressValidations, loginValidation, registerValidation } from "../../middleware/AuthMiddleware.js";
import { jwtVerify } from "../../lib/utils.js";
import { addAddress, addToCart, changePassword, getCartItems, getProducts, getUserInfo, updatePersonalInfo } from "../../controller/UserController/UserController.js";
import { getAllProducts } from "../../controller/controller.js";

const userRouter = Router();

//authentication routes
userRouter.post("/signIn", loginValidation, signIn)
userRouter.post("/signUp", registerValidation, register)
userRouter.post("/signOut", signOut)

//user routes
userRouter.get("/get-user-info", jwtVerify, getUserInfo)
userRouter.get("/get-products", jwtVerify, getAllProducts);
userRouter.get("/get-cart-items", jwtVerify, getCartItems);
userRouter.get("/get-products", jwtVerify, getProducts);

//profile related routes
userRouter.patch("/update-info", jwtVerify, updatePersonalInfo)
userRouter.patch("/change-password", jwtVerify, changePassword)
userRouter.post("/add-address", jwtVerify, addressValidations, addAddress)

//cart relateda routes
userRouter.post("/add-to-cart", jwtVerify, addToCart);
userRouter.delete("/delete-cart-item", jwtVerify);



export default userRouter
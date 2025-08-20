import { Router } from "express";
import { register, signIn, signOut } from "../../controller/UserController/AuthController.js";
import { addressValidations, loginValidation, registerValidation } from "../../middleware/AuthMiddleware.js";
import { jwtVerify } from "../../lib/utils.js";
import { addAddress, changePassword, getDisplayItems, getUserInfo, updatePersonalInfo } from "../../controller/UserController/UserController.js";
import { addToCart, deleteCartItem, getCartItems, updateCartItems } from "../../controller/UserController/CartController.js";
import { createOrder, getOrderDetails } from "../../controller/UserController/OrderController.js";
import { updateOrderStatus } from "../../controller/controller.js";

const userRouter = Router();

//authentication routes
userRouter.post("/signIn", loginValidation, signIn)
userRouter.post("/signUp", registerValidation, register)
userRouter.post("/signOut", signOut)

//user routes
userRouter.get("/get-user-info", jwtVerify, getUserInfo)
userRouter.get("/get-cart-items", jwtVerify, getCartItems);
userRouter.post("/get-displayItems", jwtVerify, getDisplayItems)

//profile related routes
userRouter.patch("/update-info", jwtVerify, updatePersonalInfo)
userRouter.patch("/change-password", jwtVerify, changePassword)
userRouter.post("/add-address", jwtVerify, addressValidations, addAddress)

//cart relateda routes
userRouter.post("/add-to-cart", jwtVerify, addToCart);
userRouter.delete("/delete-cart-item/:productId", jwtVerify, deleteCartItem);
userRouter.patch("/update-cart", jwtVerify, updateCartItems);

//order related routes
userRouter.get("/get-orders", jwtVerify, getOrderDetails)
userRouter.post("/create-order", jwtVerify, createOrder)
userRouter.post("/update-order", jwtVerify, updateOrderStatus)

export default userRouter
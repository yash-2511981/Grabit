import { Router } from "express";
import { addProductValidation, loginValidation, restaurantValidation } from "../../middleware/AuthMiddleware.js";
import { registerRestaurant, restaurantLogin, restaurantLogout } from "../../controller/VendorController/AuthController.js";
import { addProduct } from "../../controller/VendorController/VendorController.js";
import { jwtVerify } from "../../lib/utils.js";

const vendorRoutes = Router();

vendorRoutes.post("/register", restaurantValidation, registerRestaurant)
vendorRoutes.post("/login", loginValidation, restaurantLogin)
vendorRoutes.post("/logout", addProductValidation, jwtVerify, restaurantLogout)

vendorRoutes.post("/add-product", jwtVerify, addProduct)

export default vendorRoutes;
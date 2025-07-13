import { Router } from "express";
import userRouter from "./UserRoutes/UserRoutes.js";
import vendorRoutes from "./VendorRoutes/VendorRoutes.js";
import adminRouter from "./AdminRoutes/authRoutes.js";

const router = Router();

router.use("/admin", adminRouter)
router.use("/user", userRouter)
router.use("/vendor", vendorRoutes)

export default router
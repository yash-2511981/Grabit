import { Router } from 'express'
import { admingLogout, adminLogin, makeRegister } from '../../controller/AdminController/AuthController.js'
import { loginValidation } from '../../middleware/AuthMiddleware.js'
import { jwtVerify } from '../../lib/utils.js'

const adminRouter = Router()

// adminRouter.post("/register", makeRegister)
adminRouter.post("/login", loginValidation, adminLogin)
adminRouter.post("/logout", loginValidation, admingLogout)

adminRouter.post("/add-category", jwtVerify,)

export default adminRouter
import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage("Enter a proper email address"),
  body('contact').notEmpty().withMessage("Mobile number is required"),
  body('firstName').notEmpty().withMessage("FirstName is required"),
  body('lastName').notEmpty().withMessage("LastName is required"),
  body('password')
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body('pincode')
    .isLength({ max: 6 })
    .withMessage("Please Ener Valid Pincode")
];


export const loginValidation = [
  body('email').isEmail().withMessage("Enter proper email address"),
  body('password').notEmpty().withMessage("Password field is required")
]


export const restaurantValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage("Restaurant name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 to 100 characters"),

  body('email').isEmail().withMessage("Enter proper email address"),

  body('address')
    .trim()
    .notEmpty().withMessage("Address is required")
    .isLength({ min: 5 }).withMessage("Address must be at least 5 characters long"),

  body('category')
    .trim()
    .notEmpty().withMessage("Category is required"),

  body('pincode')
    .notEmpty().withMessage("Pincode is required")
    .isLength({ min: 6, max: 6 }).withMessage("Pincode must be exactly 6 digits")
    .isNumeric().withMessage("Pincode should only contain numbers"),

  body('phone')
    .notEmpty().withMessage("Mobile number is required")
    .isMobilePhone('en-IN').withMessage("Invalid Indian mobile number"),

  body('password').isLength({ min: 6 }).withMessage("Password length shoud be at least 6 characters")
]



export const addProductValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 to 100 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 1 }).withMessage("Price must be a number greater than 0"),

  body("category")
    .notEmpty().withMessage("Category is required")
    .isIn(["Veg", "Not-Veg", "Both"]).withMessage("Category must be one of: Veg, Not-Veg, Both"),

  body("restaurant")
    .notEmpty().withMessage("Restaurant ID is required")
    .isMongoId().withMessage("Invalid restaurant ID"),

  body("imageUrl")
    .notEmpty().withMessage("Image URL is required")
    .isURL().withMessage("Image URL must be a valid URL")
];


export const addressValidations = [
  body('roomNo')
    .notEmpty().withMessage("Room No or House No is required"),

  body('buildingName')
    .notEmpty().withMessage("Building Name is required")
    .isString().withMessage("Building Name must be a string"),

  body('area')
    .notEmpty().withMessage("Area is required")
    .isString().withMessage("Area must be a string"),

  body('pincode')
    .notEmpty().withMessage("Pincode is required")
    .isNumeric().withMessage("Pincode must contain only numbers")
    .isLength({ min: 6, max: 6 }).withMessage("Pincode must be exactly 6 digits"),

  body('landmark')
    .optional({ checkFalsy: true })
    .isString().withMessage("Landmark must be a string")
];

import { body } from 'express-validator';

export const registerValidation = [
  body('firstName').notEmpty().withMessage("First name is required"),
  body('lastName').notEmpty().withMessage("Last name is required"),
  body('email').isEmail().withMessage("Enter a proper email address"),
  body('mobile').notEmpty().withMessage("Mobile number is required"),
  body('preference').notEmpty().withMessage("Preference is required"),
  body('password')
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long")
];


export const loginValidation = [
  body('email').isEmail().withMessage("Enter proper email address"),
  body('password').notEmpty().withMessage("Password field is required")
]
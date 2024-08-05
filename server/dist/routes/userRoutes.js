import { Router } from "express";
import { login, register } from "../controllers/userController.js";
import { body } from "express-validator";
import validateRequest from "../middlewares/validateRequest.js";
const router = Router();
router.post("/auth/register", body("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 }), body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"), body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{6,32}$/)
    .withMessage("Password must be between 6 and 32 characters, and include at least one uppercase letter, one lowercase letter, and one number."), validateRequest, register);
router.post("/auth/login", body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"), body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{6,32}$/)
    .withMessage("Password must be between 6 and 32 characters, and include at least one uppercase letter, one lowercase letter, and one number."), validateRequest, login);
export default router;

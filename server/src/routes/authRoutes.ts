import { Router } from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/authController";
import validateRequest from "../middleware/validateRequest";
import { body } from "express-validator";

const router = Router();

router.post(
  "/",
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{6,32}$/)
    .withMessage(
      "Password must be between 6 and 32 characters, and include at least one uppercase letter, one lowercase letter, and one number."
    ),
  validateRequest,
  login
);
router.get("/refresh", refresh);
router.post("/logout", logout);
router.post(
  "/register",
  body("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 }),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).{6,32}$/)
    .withMessage(
      "Password must be between 6 and 32 characters, and include at least one uppercase letter, one lowercase letter, and one number."
    ),
  validateRequest,
  register
);

export default router;

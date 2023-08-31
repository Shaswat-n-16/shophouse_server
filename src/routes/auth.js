import Router from "express";
import { body } from "express-validator";
import {
  signup,
  login,
  forgotPassword,
  updateProfile,
} from "../controllers/authcontroller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").trim().isLength({ min: 5 }),
  body("firstName").trim().not().isEmpty(),
  body("lastName").trim().not().isEmpty(),
  signup
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("password").trim().isLength({ min: 5 }),
  login
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Please enter your email."),
  body("password").trim().isLength({ min: 5 }),
  forgotPassword
);
//user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfile);
export default router;

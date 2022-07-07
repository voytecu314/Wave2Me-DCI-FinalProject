import express from 'express';
import { body } from "express-validator";
import { userSignup, userLogin, isLogged } from '../controllers/loginControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();


//SIGNUP POST ROUTE
router.post(
    "/signup",
    [
      body("name").notEmpty().withMessage("Name is required").trim(),
      body("email", "Email is required").isEmail().normalizeEmail(),
      body("password", "Password is required and length min 4 chars.")
        .isLength({ min: 4 })
        .custom((val, { req }) => {
          if (val !== req.body.confirm_password) {
            throw new Error("Password don't match!");
          } else {
            return val;
          }
        }),
    ],
    userSignup,
  );

  //POST - login
router.post("/login", userLogin);

//GET - protected route
router.get("/islogged", auth, isLogged);
  
  export default router;
  

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js"

const authRouter = express.Router();


//Register
authRouter.post("/register", registerUser)

// Login 

authRouter.post("/login", loginUser)

export default authRouter
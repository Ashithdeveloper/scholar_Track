import express from "express";
import { getMe, login, Student } from "../controller/user.controller.js";
import verifyToken from "../middleware/middleware.js";


const router = express.Router();

//auth routes 
router.post("/studentsignup", Student);
// router.post("/otpverify", verify);
router.post("/login", login);


//get with verify token 
router.get("/getme" , verifyToken , getMe);

//resend opt

// router.post("/resendotp", resendOTP);


export default router;
import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "../config/passwordhashing.js";
import User from "../model/user.model.js";
import { generateToken } from "../Token/Token.js";



// Student Signup
export const Student = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      phoneNumber,
      caste,
      percentage,
      category,
      gender,
      institution,
      lasteducation,
    } = req.body;

    if (
      !fullname ||
      !email ||
      !password ||
      !caste ||
      !percentage ||
      !phoneNumber ||
      !gender ||
      !institution ||
      !category ||
      !lasteducation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
 const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Password hashing
    const hashedPassword = await hashPassword(password);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save user to DB
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      caste,
      phoneNumber,
      gender,
      category,
      institution,
      percentage,
      lasteducation,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 mins
    });

    await user.save();



    res.status(201).json({ message: "OTP sent to your email" ,success:true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP and create token
export const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🕒 If OTP expired, delete user and respond
    if (user.otpExpires < Date.now()) {
      await User.deleteOne({ email });
      return res
        .status(400)
        .json({ message: "OTP expired. User deleted, please sign up again." });
    }

    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Email verified successfully",
      token,
      success: true,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get User

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ user , success: true });
  } catch (error) {
    console.log(error);
  }
}
//exist user login 

export const login = async ( req, res ) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful", token, success: true });

  } catch (error) {
    console.log(error);
  }
}
//resend otp 
// export const resendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if(user.isVerified){
//       return res.status(400).json({ message: "User already verified. Please login." });
//     }

//     // Generate new OTP
//     const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

//     // Update user record with new OTP and expiry
//     user.otp = newOTP;
//     user.otpExpires = Date.now() + 5 * 60 * 1000; // expires in 5 min
//     await user.save();

//     // Send OTP
//     await sendOTP(email, newOTP);

//     res.status(200).json({
//       message: "New OTP sent successfully to your email.",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Resend OTP Error:", error);
//     res.status(500).json({ message: "Server error while resending OTP" });
//   }
// };
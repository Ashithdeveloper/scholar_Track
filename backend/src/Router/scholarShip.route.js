import express from "express";
import { getScholarship } from "../controller/scholarShip.controller.js";
import verifyToken from "../middleware/middleware.js";


const router = express.Router();

router.get("/",verifyToken,getScholarship)

export default router;
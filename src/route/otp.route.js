import express from "express";
import { sendOtp, verifyOtp } from "../controller/otp.controller.js";
import {saveSim} from "../controller/sim.controller.js"; 
import { saveImei } from "../controller/imei.controller.js";
//import Imei from "../models/imei.model.js";
import { saveMapping } from "../controller/mapping.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/sim", saveSim);
router.post("/imei", saveImei);
router.post("/mapping", saveMapping);

// router.get("/search", async (req, res) => {
//   try {
//     const { imeiNumber } = req.query;

//     if (!imeiNumber) {
//       return res.status(400).json({ message: "IMEI number required" });
//     }

//     const imei = await Imei.findOne({ imeiNumber }).populate("sims");

//     if (!imei) {
//       return res.status(404).json({ message: "IMEI not found" });
//     }

//     res.json(imei);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

export default router;

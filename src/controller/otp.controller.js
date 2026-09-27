import { AwsPage } from "twilio/lib/rest/accounts/v1/credential/aws.js";
import Otp from "../models/otp.model.js";
import { generateSecureOTP, generateSessionVerifier } from "../utils/generateOtp.js";
import { testData } from "../utils/testData.js";
import { sendSms } from "../utils/twilioClient.js";


const OTP_EXPIRY_MINUTES = 5;

// Send OTP
export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile number is required" });

  // 🧪 Always check if mobile is part of testData
  if (testData.users[mobile]) {
    const { otp, sessionVerifier } = testData.users[mobile];
    console.log(`🧪 Test OTP for ${mobile}: ${otp}`);
    return res.status(200).json({
      message: "Test OTP sent (check console)",
      otp,
      sessionVerifier,
      expiresIn: `${OTP_EXPIRY_MINUTES} minutes`
    });
  }

  const otp = generateSecureOTP();
  const sessionVerifier = generateSessionVerifier();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  try {
    await Otp.findOneAndUpdate(
      { mobile },
      { otp, createdAt: new Date(), expiresAt },
      { upsert: true, new: true }
    );

    
    await sendSms(mobile, otp);

    res.status(200).json({
      message: "OTP sent successfully",
      sessionVerifier,
      expiresIn: `${OTP_EXPIRY_MINUTES} minutes`
    });

  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


// Verify OTP
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  if (!otp) return res.status(400).json({ message: "OTP is required" });


  const testUser = Object.entries(testData.users).find(
    ([mobile, data]) => data.otp === otp
  );
  if (testUser) {
    const [mobile] = testUser;
    return res.status(200).json({
      message: "Test OTP verified successfully",
      mobile,
    });
  }

  // 🔐 Production: verify against DB
  try {
    // Find record by OTP only (latest one)
    const record = await Otp.findOne({ otp }).sort({ createdAt: -1 });
    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > record.expiresAt) {
      await Otp.deleteOne({ otp });
      return res.status(400).json({ message: "OTP expired" });
    }

    // OTP is valid → delete after use
    await Otp.deleteOne({ otp });

    res.status(200).json({
      message: "OTP verified successfully",
      mobile: record.mobile, // you still get mobile info here if needed
    });
  } catch (error) {
    console.error("OTP verify error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

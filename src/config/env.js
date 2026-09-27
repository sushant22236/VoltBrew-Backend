import dotenv from "dotenv"

dotenv.config()

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI || " ",

  twilio:{
    accountSid: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_ACCOUNT_SECRET || "",
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
  }
}
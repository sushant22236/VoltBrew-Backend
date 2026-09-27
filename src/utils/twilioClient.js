import {config} from "../config/env.js";
import twilio from "twilio";

const client = twilio(
  config.twilio.accountSid,
  config.twilio.authToken

);

export async function sendSms(mobile, otp) {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: config.twilio.phoneNumber,
      to: `+91${mobile}` // change country code if needed
    });

    return message;
}

import crypto from "crypto";

/**
 * Generate a cryptographically secure numeric OTP.
 * Uses rejection sampling to avoid modulo bias.
 * @param {number} length default 6
 * @returns {string} e.g. "482319"
 */
export function generateSecureOTP(length = 6) {
  const digits = "0123456789";
  const out = [];

  while (out.length < length) {
    const byte = crypto.randomBytes(1)[0];
    // only accept 0..249 so byte % 10 is uniform
    if (byte < 250) out.push(digits[byte % 10]);
  }

  return out.join("");
}

export function generateSessionVerifier(bytes = 16) {
  return crypto.randomBytes(bytes).toString("hex");
}
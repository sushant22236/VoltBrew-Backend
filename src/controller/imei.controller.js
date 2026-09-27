import Imei from "../models/imei.model.js";

export const saveImei = async (req, res) => {
  try {
    const { imeiNumber } = req.body;

    if (!imeiNumber) {
      return res.status(400).json({ success: false, message: "IMEI number is required" });
    }

    // check duplicate
    const existing = await Imei.findOne({ imeiNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: "IMEI already exists" });
    }

    const newImei = new Imei({ imeiNumber });
    await newImei.save();

    // 👇 return ID to frontend so it can be reused when saving SIM
    return res.json({
      success: true,
      message: "IMEI saved successfully",
      data: { _id: newImei._id, imeiNumber: newImei.imeiNumber }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error saving IMEI", error: err.message });
  }
};

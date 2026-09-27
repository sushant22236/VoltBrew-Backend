import Imei from "../models/imei.model.js";
import Sim from "../models/sim.model.js";
import Mapping from "../models/mapping.model.js";

// Save mapping
export const saveMapping = async (req, res) => {
  try {
    const { imeiNumber, simNumber } = req.body;

    if (!imeiNumber || !simNumber) {
      return res.status(400).json({ message: "IMEI and SIM numbers are required" });
    }

    // check if IMEI exists
    const imei = await Imei.findOne({ imeiNumber });
    if (!imei) {
      return res.status(404).json({ message: "IMEI not found" });
    }

    // check if SIM exists
    const sim = await Sim.findOne({ simNumber });
    if (!sim) {
      return res.status(404).json({ message: "SIM not found" });
    }

    // check if mapping already exists
    const existing = await Mapping.findOne({ imei: imei._id, sim: sim._id });
    if (existing) {
      return res.status(400).json({ message: "Mapping already exists" });
    }

    // create new mapping
    const mapping = new Mapping({ imei: imei._id, sim: sim._id });
    await mapping.save();

    const populatedMapping = await Mapping.findById(mapping._id)
      .populate("imei")
      .populate("sim");

    res.json({ message: "Mapping saved successfully", data: populatedMapping });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
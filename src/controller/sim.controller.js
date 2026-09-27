import Sim from "../models/sim.model.js";
import Imei from "../models/imei.model.js";


export const saveSim = async (req, res) => {
  try {
    const { simNumber } = req.body;

    if (!simNumber) {
      return res.status(400).json({ success: false, message: "SIM number is required" });
    }

    const imei = await Imei.findOne().sort({ createdAt: -1 });
    if (!imei) {
      return res.status(404).json({ message: "No IMEI found" });
    }

    const sim = new Sim({
      simNumber,
      imei: imei._id
    });
    await sim.save();

    imei.sims.push(sim._id);
    await imei.save();

    return res.json({ 
      success: true, 
      message: "SIM saved successfully!", 
      data: { sim, imei }
    });
  } catch (err) {
    console.error("Error saving SIM:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


import mongoose from "mongoose";

const imeiSchema = new mongoose.Schema({
  imeiNumber: { type: String, required: true, unique: true },
  sims: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sim",
    unique: true
  }],
}, { timestamps: true });

export default mongoose.model("Imei", imeiSchema);

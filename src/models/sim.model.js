import mongoose from "mongoose";
const simSchema = new mongoose.Schema({
  simNumber: { type: String, required: true },
  imei: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imei",
    unque: true,
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Sim", simSchema);

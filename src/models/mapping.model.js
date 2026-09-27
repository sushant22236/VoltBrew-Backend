import mongoose from "mongoose";

const mappingSchema = new mongoose.Schema({
  imei: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Imei",
    required: true,
  },
  sim: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sim",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Mapping", mappingSchema);

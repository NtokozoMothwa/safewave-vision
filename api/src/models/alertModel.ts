import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["panic", "fall", "heartbeat", "custom"], default: "panic" },
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false }
    },
    message: { type: String },
    isResolved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Alert = mongoose.model("Alert", alertSchema);

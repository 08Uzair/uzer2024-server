import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const status = mongoose.model("status", statusSchema);

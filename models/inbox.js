import mongoose from "mongoose";

export const inboxSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
  },
});

export const inbox = mongoose.model("inbox", inboxSchema);

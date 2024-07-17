import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "status",
  },
  quantity: {
    type: String,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paidAt: {
      type: String,
      required: true,
    },
    itemsPrice: {
      type: String,
      required: true,
    },
    taxPrice: {
      type: String,
      required: true,
    },
    shippingPrice: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    deliveredAt: {
      createdAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
});

export const order = mongoose.model("order", orderSchema);

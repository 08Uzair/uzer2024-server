import express from "express";
import {
  addOrder,
  getOrders,
  getOrdersByUserId,
  deleteOrder,
} from "../controllers/orders.js";

export const orderRouter = express.Router();
orderRouter.post("/", addOrder);
orderRouter.get("/", getOrders);
orderRouter.delete("/:id", deleteOrder);
orderRouter.get("/:userId", getOrdersByUserId);

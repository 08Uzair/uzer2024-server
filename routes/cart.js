import express from "express";

import {
  addCartProduct,
  getCartProducts,
  deleteCartProduct,
  updateCartProduct,
  getCartProductByUserId,
  deleteCartProductByUserId,
} from "../controllers/cart.js";
export const cartRouter = express.Router();
cartRouter.post("/", addCartProduct);
cartRouter.get("/", getCartProducts);
cartRouter.get("/:userId", getCartProductByUserId);
cartRouter.put("/:id", updateCartProduct);
cartRouter.delete("/:id", deleteCartProduct);
cartRouter.delete("/:userId", deleteCartProductByUserId);

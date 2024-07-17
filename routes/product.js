import express from "express";

import {
  addProduct,
  deleteProduct,
  updateProduct,
  searchProduct,
  getProducts,
  getProductById,
} from "../controllers/products.js";

export const productRouter = express.Router();
productRouter.post("/", addProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/:id", searchProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);

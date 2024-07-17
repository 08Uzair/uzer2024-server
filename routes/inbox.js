import express from "express";
import {
  addMessage,
  deleteMessage,
  updateMessage,
  getMessage,
  getMessageById,
} from "../controllers/inbox.js";

export const messageRouter = express.Router();
messageRouter.post("/", addMessage);
messageRouter.get("/", getMessage);
messageRouter.get("/:id", getMessageById);
messageRouter.delete("/:id", deleteMessage);
messageRouter.put("/:id", updateMessage);

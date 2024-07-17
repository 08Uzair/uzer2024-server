import express from "express";
import { addStatus, getStatus } from "../controllers/status.js";

export const statusRouter = express.Router();
statusRouter.post("/", addStatus);
statusRouter.get("/", getStatus);

import express from "express";
const router = express.Router();
import aiController from "../controllers/ai.controller.js";

router.post("/get-response", aiController.getResponse);

export default router;
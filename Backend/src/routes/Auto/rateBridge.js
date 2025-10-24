import { Router } from "express";
import { getQuote } from "../controllers/rateBridgeController.js";

const router = Router();

router.post("/", getQuote);

export default router;

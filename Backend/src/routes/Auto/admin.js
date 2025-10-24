import express from "express";
import { isAuthenticated, authorizeRole } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;

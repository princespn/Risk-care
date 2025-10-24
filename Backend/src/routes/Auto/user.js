import express from "express";
import { isAuthenticated, authorizeRole } from "../../middlewares/auth.js";

const router = express.Router();

router.get("/profile", isAuthenticated, (req, res) => {
  res.json({ profile: req.user });
});

router.get("/dashboard", isAuthenticated, authorizeRole("user"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

export default router;

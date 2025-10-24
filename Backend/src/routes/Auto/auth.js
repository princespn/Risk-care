import express from "express";
import bcrypt from "bcrypt";
import { db } from "../../confiq/db.js";
import { users } from "../../models/Auto/users.js";
import { generateToken } from "../../middlewares/auth.js";

const router = express.Router();


router.post("/register", async (req, res) => {
  const { email, password, role = "user" } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.select().from(users).where(users.email.eq(email));
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default router;

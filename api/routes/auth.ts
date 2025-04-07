import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";

const router = Router();

const users: any[] = []; // replace with MongoDB later

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const existing = users.find((u) => u.email === email);
  if (existing) return res.status(400).json({ message: "User exists." });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashed };
  users.push(user);
  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found." });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password." });

  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

export default router;

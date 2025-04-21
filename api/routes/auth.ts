
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";

const router = Router();

const users: any[] = []; // replace with MongoDB later

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existing = users.find((u) => u.email === email);
  if (existing) {
    res.status(400).json({ message: "User exists." });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashed };
  users.push(user);
  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(400).json({ message: "User not found." });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(400).json({ message: "Wrong password." });
    return;
  }

  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

export default router;

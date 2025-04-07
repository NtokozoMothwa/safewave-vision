import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "safesphere_secret";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error();

    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};

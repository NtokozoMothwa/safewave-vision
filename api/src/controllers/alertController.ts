import { io } from "../index"; // 👈 import socket instance

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { type, location, message } = req.body;
    const userId = (req as any).user._id;

    const newAlert = await Alert.create({
      user: userId,
      type,
      location,
      message
    });

    // 🧨 Emit real-time event to clients
    io.emit("new_alert", {
      user: userId,
      type,
      location,
      message,
      createdAt: newAlert.createdAt
    });

    res.status(201).json({ alert: newAlert });
  } catch (err) {
    res.status(500).json({ message: "Failed to create alert", error: err });
  }
};

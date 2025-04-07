import { Request, Response } from "express";
import { Alert } from "../models/alertModel";

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

    res.status(201).json({ alert: newAlert });
  } catch (err) {
    res.status(500).json({ message: "Failed to create alert", error: err });
  }
};

export const getUserAlerts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const alerts = await Alert.find({ user: userId });
    res.json({ alerts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alerts", error: err });
  }
};

export const resolveAlert = async (req: Request, res: Response) => {
  try {
    const alertId = req.params.id;
    const updated = await Alert.findByIdAndUpdate(alertId, { isResolved: true }, { new: true });
    res.json({ alert: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to resolve alert", error: err });
  }
};

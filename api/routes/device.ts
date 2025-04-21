
import { Router, Request, Response } from "express";
import { authenticate } from "../middleware/auth";
const router = Router();

const devices: any[] = [];

router.post("/register", authenticate, (req: any, res: Response) => {
  const { serial, battery, location } = req.body;
  devices.push({ serial, battery, location, owner: req.user });
  return res.status(200).json({ message: "Device registered." });
});

router.post("/heartbeat", authenticate, (req: any, res: Response) => {
  const { serial, battery } = req.body;
  const device = devices.find((d) => d.serial === serial);
  if (device) {
    device.battery = battery;
    device.lastCheckIn = new Date();
    return res.status(200).json({ message: "Status updated." });
  } else {
    return res.status(404).json({ message: "Device not found." });
  }
});

export default router;

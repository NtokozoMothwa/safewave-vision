
import { Router, Request, Response } from "express";
import { scoreUserRisk } from "../utils/threat";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { heartRate, oxygenLevel, temperature, locationRiskZone } = req.body;
  const riskScore = scoreUserRisk({ heartRate, oxygenLevel, temperature, locationRiskZone });
  return res.status(200).json({ riskScore });
});

export default router;

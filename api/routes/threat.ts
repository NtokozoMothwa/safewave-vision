
import { Router } from "express";
import { scoreUserRisk } from "../utils/threat";

const router = Router();

router.post("/", (req, res) => {
  const { heartRate, oxygenLevel, temperature, locationRiskZone } = req.body;
  const riskScore = scoreUserRisk({ heartRate, oxygenLevel, temperature, locationRiskZone });
  res.status(200).json({ riskScore });
});

export default router;

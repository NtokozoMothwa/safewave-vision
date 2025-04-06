export function scoreUserRisk(data: {
  heartRate: number;
  oxygenLevel: number;
  temperature: number;
  locationRiskZone?: boolean;
}): number {
  let score = 0;
  if (data.heartRate > 150 || data.heartRate < 40) score += 2;
  if (data.oxygenLevel < 85) score += 2;
  if (data.temperature > 38.5) score += 1;
  if (data.locationRiskZone) score += 1;
  return Math.min(score, 5);
}

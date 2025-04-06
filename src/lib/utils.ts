import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind and conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Clean and validate health telemetry data
export function sanitizeHealthData(data: {
  heartRate?: number;
  oxygenLevel?: number;
  temperature?: number;
}) {
  return {
    heartRate: Math.max(30, Math.min(data.heartRate ?? 0, 200)),
    oxygenLevel: Math.max(70, Math.min(data.oxygenLevel ?? 0, 100)),
    temperature: Math.max(30, Math.min(data.temperature ?? 0, 43)),
  };
}

// Simulate basic threat scoring based on health + logic rules
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

  return Math.min(score, 5); // Max score of 5
}

// Detect if the device is offline and fallback to internal storage
export function offlineModeHandler(isOnline: boolean, data: any) {
  if (!isOnline) {
    // In real app: store data locally (IndexedDB, secure storage, etc.)
    console.warn("Device offline. Data cached locally:", data);
  }
}

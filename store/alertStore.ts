import { create } from "zustand"

type Alert = {
  id: number
  message: string
  timestamp: string
  status: "new" | "acknowledged" | "dismissed" | "escalated"
}

type AlertStore = {
  alerts: Alert[]
  addAlert: (alert: Alert) => void
  updateAlertStatus: (id: number, status: Alert["status"]) => void
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set((state) => ({ alerts: [...state.alerts, { ...alert, status: "new" }] })),
  updateAlertStatus: (id, status) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, status } : alert
      ),
    })),
}))

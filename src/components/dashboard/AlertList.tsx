import { useAlertStore } from "@/store/alertStore"
import { Button } from "@/components/ui/button"

export default function AlertList() {
  const { alerts, updateAlertStatus } = useAlertStore()

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">🚨 Incoming Alerts</h2>
      {alerts.length === 0 ? (
        <p className="text-muted-foreground">No alerts yet.</p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border p-4 rounded-xl shadow-sm ${
              alert.status === "escalated"
                ? "bg-red-100"
                : alert.status === "acknowledged"
                ? "bg-green-100"
                : alert.status === "dismissed"
                ? "bg-gray-100"
                : "bg-white"
            }`}
          >
            <p className="font-medium">{alert.message}</p>
            <p className="text-xs text-muted-foreground">{alert.timestamp}</p>

            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                onClick={() => updateAlertStatus(alert.id, "acknowledged")}
              >
                ✅ Acknowledge
              </Button>
              <Button
                variant="ghost"
                onClick={() => updateAlertStatus(alert.id, "dismissed")}
              >
                🚫 Dismiss
              </Button>
              <Button
                variant="destructive"
                onClick={() => updateAlertStatus(alert.id, "escalated")}
              >
                🔺 Escalate
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

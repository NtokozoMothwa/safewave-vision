import React, { useEffect, useState } from "react"
import { useSocket } from "../lib/socket"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Alert = {
  id: string
  message: string
  timestamp: string
  location?: string
}

export default function AlertFeed() {
  const socket = useSocket()
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    if (!socket) return

    const handleNewAlert = (alert: Alert) => {
      setAlerts(prev => [alert, ...prev])
    }

    socket.on("new-alert", handleNewAlert)

    return () => {
      socket.off("new-alert", handleNewAlert)
    }
  }, [socket])

  return (
    <Card className="p-4 mt-4">
      <h2 className="text-xl font-semibold mb-2">🚨 Real-Time Alerts</h2>
      <ScrollArea className="h-60 pr-2">
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts yet...</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="border-b pb-2 mb-2 last:border-b-0 last:pb-0"
            >
              <p className="text-sm font-medium">{alert.message}</p>
              {alert.location && (
                <p className="text-xs text-gray-400">📍 {alert.location}</p>
              )}
              <p className="text-xs text-gray-400">
                🕒 {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </ScrollArea>
    </Card>
  )
}

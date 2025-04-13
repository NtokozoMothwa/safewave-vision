import { useEffect, useState } from "react"
import { useSocketStore } from "@/store/socketStore"
import { useAuth } from "@/context/AuthContext"

type Alert = {
  id: string
  type: string
  message: string
  location: string
  status: string
  createdAt: string
  createdBy: string
  responderStatus?: "pending" | "enroute" | "arrived"
}

export default function ResponderConsole() {
  const { user } = useAuth()
  const socket = useSocketStore((state) => state.socket)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    if (!socket) return

    socket.emit("get-active-alerts")

    socket.on("active-alerts", (data: Alert[]) => {
      setAlerts(data)
    })

    socket.on("alert-updated", (updated: Alert) => {
      setAlerts(prev => prev.map(a => a.id === updated.id ? updated : a))
    })

    return () => {
      socket.off("active-alerts")
      socket.off("alert-updated")
    }
  }, [socket])

  const updateResponderStatus = (id: string, status: Alert["responderStatus"]) => {
    socket?.emit("update-responder-status", { id, status })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛟 Responder Console</h1>
      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="p-4 rounded shadow bg-white border">
            <p className="font-semibold text-lg">{alert.type}</p>
            <p className="text-sm text-gray-500">{alert.message} • {alert.location}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-400">Responder Status: {alert.responderStatus || "Pending"}</span>
              <button onClick={() => updateResponderStatus(alert.id, "enroute")} className="bg-yellow-400 text-white px-2 py-1 rounded">🚗 Enroute</button>
              <button onClick={() => updateResponderStatus(alert.id, "arrived")} className="bg-blue-500 text-white px-2 py-1 rounded">📍 Arrived</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

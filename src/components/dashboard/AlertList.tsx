import { useEffect, useState } from "react"
import { useSocketStore } from "@/store/socketStore"
import { useAuth } from "@/context/AuthContext"

type Alert = {
  id: string
  type: string
  message: string
  location: string
  createdAt: string
  createdBy: string
  status: "active" | "resolved"
}

export default function AlertList() {
  const { user } = useAuth()
  const socket = useSocketStore((state) => state.socket)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    if (!socket) return

    socket.on("new-alert", (alert: Alert) => {
      setAlerts((prev) => [...prev, alert])
    })

    return () => {
      socket.off("new-alert")
    }
  }, [socket])

  const relevantAlerts = alerts.filter(alert => {
    if (user?.role === "admin") return true
    if (user?.role === "agent") return alert.createdBy === user.username
    if (user?.role === "responder") return alert.status === "active"
    return false
  })

  const resolveAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: "resolved" } : a))
    socket?.emit("resolve-alert", id)
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-2">🚨 Alerts Feed</h2>
      <ul className="space-y-2 max-h-[300px] overflow-y-auto">
        {relevantAlerts.length === 0 && <p className="text-sm text-gray-400">No alerts yet.</p>}
        {relevantAlerts.map(alert => (
          <li key={alert.id} className={`p-2 border rounded ${alert.status === "resolved" ? "bg-green-100" : "bg-yellow-100"}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{alert.type}</p>
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs text-gray-500">From: {alert.createdBy} • {alert.location}</p>
              </div>
              {user?.role === "responder" && alert.status === "active" && (
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="bg-green-500 px-2 py-1 rounded text-white text-sm"
                >
                  Resolve
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

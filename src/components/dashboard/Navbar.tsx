import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4">
      <div className="text-2xl font-bold">SafeWave Vision</div>
      <div className="space-x-4 flex items-center">
        <span className="text-sm text-gray-300">👤 {user?.username} ({user?.role})</span>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
      </div>
    </nav>
  )
}

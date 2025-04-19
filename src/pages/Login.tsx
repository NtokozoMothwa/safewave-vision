import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { setUserRole } from '@/utils/auth';

const Login = () => {
  const handleLogin = (role: string) => {
    setUserRole(role);
    window.location.href = '/';
  };

  return (
    <div className="p-6 space-y-4">
      <h2>Select Role:</h2>
      <button onClick={() => handleLogin('admin')}>Admin</button>
      <button onClick={() => handleLogin('responder')}>Responder</button>
      <button onClick={() => handleLogin('guard')}>Guard</button>
    </div>
  );
};

export default Login;

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [role, setRole] = useState<"admin" | "agent" | "responder">("agent")
  const navigate = useNavigate()

  const handleLogin = () => {
    login(username, role)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <input
        className="border p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <select className="border p-2 rounded" value={role} onChange={(e) => setRole(e.target.value as any)}>
        <option value="admin">Admin</option>
        <option value="agent">Agent</option>
        <option value="responder">Responder</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Enter
      </button>
    </div>
  )
}

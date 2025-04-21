
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { useAuth } from "@/context/AuthContext";
import ResponderConsole from "@/pages/ResponderConsole";

export default function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/responder" element={<ResponderConsole />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

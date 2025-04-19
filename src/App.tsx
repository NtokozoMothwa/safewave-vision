import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { SocketProvider } from "@/context/SocketContext"
import AppRoutes from "@/routes/AppRoutes"
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleSwitcher from '@/components/RoleSwitcher';
import { useEffect, useState } from 'react';
import { getUserRole } from '@/utils/auth';
import AdminNav from '@/components/nav/AdminNav';
import ResponderNav from '@/components/nav/ResponderNav';
import GuardNav from '@/components/nav/GuardNav';
import Dashboard from '@/pages/Dashboard';
import TriggerPanel from '@/pages/TriggerPanel';

<Route path="/trigger" element={<TriggerPanel />} />

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = getUserRole();
    setRole(storedRole);
  }, []);

  const renderNav = () => {
    switch (role) {
      case 'admin':
        return <AdminNav />;
      case 'responder':
        return <ResponderNav />;
      case 'guard':
        return <GuardNav />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderNav()}
      <main className="mt-6">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;

<RoleSwitcher />

<Routes>
  <Route path="/dashboard" element={
    <ProtectedRoute allowedRoles={['admin', 'guard', 'responder']}>
      <Dashboard />
    </ProtectedRoute>
  } />

  <Route path="/responder-panel" element={
    <ProtectedRoute allowedRoles={['responder']}>
      <ResponderConnect />
    </ProtectedRoute>
  } />

  <Route path="/admin-only" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  } />

  <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
</Routes>

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

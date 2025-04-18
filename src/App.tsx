import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { SocketProvider } from "@/context/SocketContext"
import AppRoutes from "@/routes/AppRoutes"
import ProtectedRoute from '@/components/ProtectedRoute';
import RoleSwitcher from '@/components/RoleSwitcher';
...
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

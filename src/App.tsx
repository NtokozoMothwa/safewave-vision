
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loading } from "@/components/ui/loading";
import { Suspense, lazy } from "react";
import { AuthProvider, RequireAuth, RequireAdmin } from "./context/AuthContext";

// Import Dashboard component directly to avoid lazy loading issues
import Dashboard from "./pages/Dashboard";

// Use lazy loading for routes that aren't needed on initial load
const Models = lazy(() => import("./pages/Models"));
const Settings = lazy(() => import("./pages/Settings"));
const HealthHistory = lazy(() => import("./pages/HealthHistory"));
const GeofencingSettings = lazy(() => import("./pages/GeofencingSettings"));
const ApiDocs = lazy(() => import("./pages/ApiDocs"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Users = lazy(() => import("./pages/Users"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

// Configure query client with lower stale time to improve initial load performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30 * 1000,
    },
  },
});

// Custom loading component for suspense fallback with faster appearance
const SuspenseFallback = () => (
  <div className="p-4 bg-safesphere-dark min-h-screen flex items-center justify-center">
    <Loading size="sm" text="Loading..." delayedAppearance={false} />
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" theme="dark" toastOptions={{
              classNames: {
                toast: "bg-safesphere-dark-card border-white/10 text-safesphere-white",
                title: "text-safesphere-white",
                description: "text-safesphere-white/70",
                actionButton: "bg-safesphere-red text-white",
                cancelButton: "bg-safesphere-dark-hover text-safesphere-white",
                closeButton: "text-safesphere-white-muted/60 hover:text-safesphere-white",
              }
            }} />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              <Route path="/login" element={
                <Suspense fallback={<SuspenseFallback />}>
                  <Login />
                </Suspense>
              } />
              <Route path="/sign-up" element={
                <Suspense fallback={<SuspenseFallback />}>
                  <SignUp />
                </Suspense>
              } />
              <Route path="/home" element={
                <Suspense fallback={<SuspenseFallback />}>
                  <Index />
                </Suspense>
              } />
              
              {/* Protected routes for authenticated users */}
              <Route path="/dashboard" element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } />
              
              <Route path="/models" element={
                <RequireAuth>
                  <Suspense fallback={<SuspenseFallback />}>
                    <Models />
                  </Suspense>
                </RequireAuth>
              } />
              
              <Route path="/settings" element={
                <RequireAuth>
                  <Suspense fallback={<SuspenseFallback />}>
                    <Settings />
                  </Suspense>
                </RequireAuth>
              } />
              
              <Route path="/health-history" element={
                <RequireAuth>
                  <Suspense fallback={<SuspenseFallback />}>
                    <HealthHistory />
                  </Suspense>
                </RequireAuth>
              } />
              
              <Route path="/geofencing" element={
                <RequireAuth>
                  <Suspense fallback={<SuspenseFallback />}>
                    <GeofencingSettings />
                  </Suspense>
                </RequireAuth>
              } />
              
              <Route path="/api-docs" element={
                <RequireAuth>
                  <Suspense fallback={<SuspenseFallback />}>
                    <ApiDocs />
                  </Suspense>
                </RequireAuth>
              } />
              
              <Route path="/notifications" element={
                <RequireAuth>
                  <Suspense fallback={<SuspenseFallback />}>
                    <Notifications />
                  </Suspense>
                </RequireAuth>
              } />
              
              {/* Admin-only routes */}
              <Route path="/admin" element={
                <RequireAdmin>
                  <Suspense fallback={<SuspenseFallback />}>
                    <AdminDashboard />
                  </Suspense>
                </RequireAdmin>
              } />
              
              <Route path="/users" element={
                <RequireAdmin>
                  <Suspense fallback={<SuspenseFallback />}>
                    <Users />
                  </Suspense>
                </RequireAdmin>
              } />
              
              {/* 404 route */}
              <Route path="*" element={
                <Suspense fallback={<SuspenseFallback />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loading } from "@/components/ui/loading";
import { Suspense, lazy } from "react";

// Use lazy loading for routes that aren't needed on initial load
const Dashboard = lazy(() => import("./pages/Dashboard"));
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
        <BrowserRouter>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* All routes are now accessible without authentication */}
            <Route path="/dashboard" element={
              <Suspense fallback={<SuspenseFallback />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="/models" element={
              <Suspense fallback={<SuspenseFallback />}>
                <Models />
              </Suspense>
            } />
            <Route path="/settings" element={
              <Suspense fallback={<SuspenseFallback />}>
                <Settings />
              </Suspense>
            } />
            <Route path="/health-history" element={
              <Suspense fallback={<SuspenseFallback />}>
                <HealthHistory />
              </Suspense>
            } />
            <Route path="/geofencing" element={
              <Suspense fallback={<SuspenseFallback />}>
                <GeofencingSettings />
              </Suspense>
            } />
            <Route path="/api-docs" element={
              <Suspense fallback={<SuspenseFallback />}>
                <ApiDocs />
              </Suspense>
            } />
            <Route path="/notifications" element={
              <Suspense fallback={<SuspenseFallback />}>
                <Notifications />
              </Suspense>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<SuspenseFallback />}>
                <AdminDashboard />
              </Suspense>
            } />
            <Route path="/users" element={
              <Suspense fallback={<SuspenseFallback />}>
                <Users />
              </Suspense>
            } />
            <Route path="/home" element={
              <Suspense fallback={<SuspenseFallback />}>
                <Index />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<SuspenseFallback />}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

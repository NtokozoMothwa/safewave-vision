import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider, RequireAuth, RequireAdmin } from "@/context/AuthContext";
import { Loading } from "@/components/ui/loading";
import { Suspense, lazy } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

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

// Updated key format for Clerk
const PUBLISHABLE_KEY = "pk_test_bGlzdGxlc3MtbWFuYXRlZS0zMC5jbGVyay5hY2NvdW50cy5kZXYk";

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
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        layout: {
          showOptionalFields: true,
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorPrimary: '#e11d48',
          colorBackground: '#171717',
          colorText: '#ffffff',
          colorInputText: '#ffffff',
          colorInputBackground: '#262626',
          borderRadius: '0.5rem'
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" theme="dark" toastOptions={{
              classNames: {
                toast: "bg-safesphere-dark-card border-white/10 text-safesphere-white",
                title: "text-safesphere-white",
                description: "text-safesphere-white-muted/70",
                actionButton: "bg-safesphere-red text-white",
                cancelButton: "bg-safesphere-dark-hover text-safesphere-white",
                closeButton: "text-safesphere-white-muted/60 hover:text-safesphere-white",
              }
            }} />
            <BrowserRouter>
              <Routes>
                {/* Direct to login to prevent loading issues */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                
                {/* Home route separate from root route */}
                <Route path="/home" element={
                  <Suspense fallback={<SuspenseFallback />}>
                    <Index />
                  </Suspense>
                } />
                
                {/* Other routes use suspense for lazy loading */}
                <Route path="/dashboard" element={
                  <RequireAuth>
                    <Suspense fallback={<SuspenseFallback />}>
                      <Dashboard />
                    </Suspense>
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
                <Route path="*" element={
                  <Suspense fallback={<SuspenseFallback />}>
                    <NotFound />
                  </Suspense>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;

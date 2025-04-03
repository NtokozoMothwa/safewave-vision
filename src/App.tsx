
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider, RequireAuth, RequireAdmin } from "@/context/AuthContext";
import { Loading } from "@/components/ui/loading";
import { Suspense, lazy, useEffect } from "react";
import Index from "./pages/Index";

// Use lazy loading for routes that aren't needed on initial load
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Models = lazy(() => import("./pages/Models"));
const Settings = lazy(() => import("./pages/Settings"));
const HealthHistory = lazy(() => import("./pages/HealthHistory"));
const GeofencingSettings = lazy(() => import("./pages/GeofencingSettings"));
const ApiDocs = lazy(() => import("./pages/ApiDocs"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Users = lazy(() => import("./pages/Users"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Notifications = lazy(() => import("./pages/Notifications"));

// Using a demo key since current one is invalid
const PUBLISHABLE_KEY = "pk_test_Y2xlcmsuYmlnc3VyLmxpc3RsZXNzLW1hbmF0ZWUtMzAuY2xlcmsuYWNjb3VudHMuZGV2JA";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Custom loading component for suspense fallback with faster appearance
const SuspenseFallback = () => (
  <div className="p-8 bg-safesphere-dark min-h-screen flex items-center justify-center">
    <Loading size="md" text="Loading..." delayedAppearance={false} />
  </div>
);

const App = () => {
  useEffect(() => {
    // Apply dark mode to the body to ensure proper styling
    document.body.classList.add('dark');
    
    // Set up viewport height for mobile devices
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    
    return () => window.removeEventListener('resize', setVh);
  }, []);

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
                <Route path="/" element={<Index />} />
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

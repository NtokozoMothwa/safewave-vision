
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, RequireAuth, RequireAdmin } from "@/context/AuthContext";
import Index from "./pages/Index";
import Models from "./pages/Models";
import Settings from "./pages/Settings";
import HealthHistory from "./pages/HealthHistory";
import GeofencingSettings from "./pages/GeofencingSettings";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

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
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <RequireAuth>
                  <Index />
                </RequireAuth>
              } />
              <Route path="/models" element={
                <RequireAuth>
                  <Models />
                </RequireAuth>
              } />
              <Route path="/settings" element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              } />
              <Route path="/health-history" element={
                <RequireAuth>
                  <HealthHistory />
                </RequireAuth>
              } />
              <Route path="/geofencing" element={
                <RequireAuth>
                  <GeofencingSettings />
                </RequireAuth>
              } />
              <Route path="/admin" element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              } />
              <Route path="/users" element={
                <RequireAdmin>
                  <Users />
                </RequireAdmin>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

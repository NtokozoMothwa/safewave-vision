
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Models from "./pages/Models";
import Settings from "./pages/Settings";
import HealthHistory from "./pages/HealthHistory";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Apply dark mode to the body to ensure proper styling
    document.body.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/" element={<Index />} />
            <Route path="/models" element={<Models />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/health-history" element={<HealthHistory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

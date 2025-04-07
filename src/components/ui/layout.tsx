
import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import AnimatedTransition from "../AnimatedTransition";
import NotificationsBadge from "../NotificationsBadge";
import { Loading } from "./loading";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  skipLoadingCheck?: boolean; // Add this to skip loading checks for certain pages
}

export function Layout({ children, skipLoadingCheck = false }: LayoutProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const [isContentReady, setIsContentReady] = useState(false);
  const location = useLocation();

  // Set up navigation options for each role
  const userNavLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/health-history", label: "Health History" },
    { href: "/geofencing", label: "Geofencing" },
    { href: "/models", label: "Models" },
    { href: "/settings", label: "Settings" },
  ];

  const adminNavLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin Panel" },
    { href: "/users", label: "User Management" },
    { href: "/api-docs", label: "API Docs" },
    { href: "/settings", label: "Settings" },
  ];

  const navLinks = isAdmin ? adminNavLinks : userNavLinks;

  // Get current path for active tab
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const found = navLinks.find(link => link.href === currentPath);
    return found ? found.href : navLinks[0].href;
  };

  // Improved handling of loading state
  useEffect(() => {
    if (!isLoading || skipLoadingCheck) {
      // Reduced delay for faster transition
      const timer = setTimeout(() => {
        setIsContentReady(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, skipLoadingCheck]);

  // Only show loading when authentication is actively being checked
  // and we're not skipping the loading check
  if (isLoading && !skipLoadingCheck) {
    return <Loading size="md" text="Preparing application..." fullscreen delayedAppearance={false} />;
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen flex flex-col bg-safesphere-dark text-safesphere-white"
      >
        <Header rightContent={isAuthenticated ? <NotificationsBadge /> : undefined} />
        
        {isAuthenticated && (
          <div className="sticky top-16 z-40 bg-safesphere-dark-card border-b border-white/10 pb-1 pt-2 px-4">
            <Tabs defaultValue={getActiveTab()} className="w-full">
              <TabsList className="bg-safesphere-dark-hover border border-white/10 w-full justify-start overflow-x-auto">
                {navLinks.map(link => (
                  <TabsTrigger 
                    key={link.href} 
                    value={link.href} 
                    className="data-[state=active]:bg-safesphere-dark"
                    asChild
                  >
                    <Link to={link.href}>{link.label}</Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        
        <main className={cn(
          "flex-1 pt-4",
          isContentReady ? "opacity-100" : "opacity-0"
        )}>
          <AnimatedTransition>
            {isAdmin && (
              <motion.div 
                className="bg-safesphere-red-dark py-2 px-4 text-center text-sm flex items-center justify-center gap-2 mb-4"
                initial={{ y: -40 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Shield size={16} />
                <span>Admin Mode - You have elevated permissions</span>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              {children}
            </motion.div>
          </AnimatedTransition>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

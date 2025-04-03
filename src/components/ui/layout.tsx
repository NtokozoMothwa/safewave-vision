
import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import AnimatedTransition from "../AnimatedTransition";
import NotificationsBadge from "../NotificationsBadge";
import { Loading } from "./loading";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isContentReady, setIsContentReady] = useState(false);

  // Improved loading progress simulation
  useEffect(() => {
    if (isLoading) {
      // Start at a higher value to give a perception of faster loading
      setLoadingProgress(30);
      
      // Using a faster interval for quicker updates
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          // Accelerate progress more quickly
          const increment = (100 - prev) * 0.15;
          return Math.min(prev + increment, 95);
        });
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
      // Reduced delay for faster transition
      const timer = setTimeout(() => {
        setIsContentReady(true);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading size="lg" text="Loading application..." fullscreen progress={loadingProgress} delayedAppearance={false} />;
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
        
        <div className="flex flex-1">
          {showSidebar && isAuthenticated && <Sidebar />}
          
          <main className={cn(
            "flex-1 pt-16", 
            showSidebar && isAuthenticated ? "lg:ml-[280px]" : "",
            isContentReady ? "opacity-100" : "opacity-0"
          )}>
            <AnimatedTransition>
              {isAdmin && (
                <motion.div 
                  className="bg-safesphere-red-dark py-2 px-4 text-center text-sm flex items-center justify-center gap-2"
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

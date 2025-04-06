
import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import AnimatedTransition from "../AnimatedTransition";
import NotificationsBadge from "../NotificationsBadge";
import { Loading } from "./loading";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  skipLoadingCheck?: boolean; // Add this to skip loading checks for certain pages
}

export function Layout({ children, skipLoadingCheck = false }: LayoutProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const [isContentReady, setIsContentReady] = useState(false);

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
        
        <main className={cn(
          "flex-1 pt-16",
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
      </motion.div>
    </AnimatePresence>
  );
}

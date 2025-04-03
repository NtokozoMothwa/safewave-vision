
import { ReactNode, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Sidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import AnimatedTransition from "../AnimatedTransition";
import NotificationsBadge from "../NotificationsBadge";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-safesphere-dark text-safesphere-white">
      <Header rightContent={isAuthenticated ? <NotificationsBadge /> : undefined} />
      
      <div className="flex flex-1">
        {showSidebar && isAuthenticated && <Sidebar />}
        
        <main className={`flex-1 ${showSidebar && isAuthenticated ? "lg:ml-[280px]" : ""}`}>
          <AnimatedTransition>
            {isAdmin && (
              <div className="bg-safesphere-red-dark py-1 px-4 text-center text-xs">
                Admin Mode - You have elevated permissions
              </div>
            )}
            {children}
          </AnimatedTransition>
        </main>
      </div>
    </div>
  );
}

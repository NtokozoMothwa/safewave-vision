
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
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-safesphere-dark text-safesphere-white">
      {/* Add NotificationsBadge to the Header */}
      <Header rightContent={isAuthenticated ? <NotificationsBadge /> : undefined} />
      
      <div className="flex flex-1">
        {showSidebar && isAuthenticated && <Sidebar />}
        
        <main className={`flex-1 ${showSidebar && isAuthenticated ? "lg:ml-[280px]" : ""}`}>
          <AnimatedTransition>
            {children}
          </AnimatedTransition>
        </main>
      </div>
    </div>
  );
}

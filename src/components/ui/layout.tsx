
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-safesphere-dark text-safesphere-white">
      <main className="h-full">
        {children}
      </main>
    </div>
  );
}

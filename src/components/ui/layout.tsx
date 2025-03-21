
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Users, ShieldAlert, ActivitySquare, Bell, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-safesphere-dark text-safesphere-white flex flex-col">
      <header className="bg-safesphere-dark-card border-b border-white/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-safesphere-red" />
              <span className="font-bold text-lg">SafeSphere Admin</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-4">
              <Link 
                to="/" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/admin" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/admin') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
                }`}
              >
                <ActivitySquare className="h-4 w-4" />
                <span>Admin</span>
              </Link>
              <Link 
                to="/users" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/users') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
              <Link 
                to="/settings" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  isActive('/settings') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-full hover:bg-safesphere-dark-hover transition-colors">
              <Bell className="h-5 w-5 text-safesphere-white-muted/70" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-safesphere-red"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-safesphere-dark-hover flex items-center justify-center text-safesphere-white border border-white/10">
                A
              </div>
              <span className="hidden md:block text-sm">Admin</span>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-1.5 rounded-md hover:bg-safesphere-dark-hover transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-safesphere-white" />
              ) : (
                <Menu className="h-6 w-6 text-safesphere-white" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-3 px-2 mt-2 border-t border-white/10">
            <Link 
              to="/" 
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-md transition-colors my-1 ${
                isActive('/') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/admin" 
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-md transition-colors my-1 ${
                isActive('/admin') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ActivitySquare className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            <Link 
              to="/users" 
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-md transition-colors my-1 ${
                isActive('/users') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-md transition-colors my-1 ${
                isActive('/settings') ? 'bg-safesphere-dark-hover text-safesphere-white' : 'text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Settings, Users, Shield, ActivitySquare, Bell, Menu, X,
  Database, Server, BarChart3, FileText, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-safesphere-dark text-safesphere-white flex flex-col">
      <header className="bg-safesphere-dark-card border-b border-white/10 py-3 px-4 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-safesphere-red" />
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
                <span>Analytics</span>
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
            <div className="hidden md:flex items-center gap-2 bg-safesphere-dark-hover px-3 py-1.5 rounded-md">
              <div className="h-7 w-7 rounded-full bg-safesphere-red/20 flex items-center justify-center text-safesphere-red border border-safesphere-red/30">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Admin</span>
                <span className="text-xs text-safesphere-white-muted/60">System</span>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="hidden md:flex items-center gap-1.5 p-1.5 rounded-md hover:bg-safesphere-dark-hover text-safesphere-white-muted/70 hover:text-safesphere-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
            
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
              <span>Analytics</span>
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
            <div 
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-md transition-colors my-1 text-safesphere-white-muted/70 hover:text-safesphere-white hover:bg-safesphere-dark-hover cursor-pointer"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-safesphere-dark-card border-t border-white/10 p-2">
        <div className="flex justify-around">
          <Link 
            to="/" 
            className={`p-2 rounded-md flex flex-col items-center ${isActive('/') ? 'text-safesphere-red' : 'text-safesphere-white-muted/60'}`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link 
            to="/users" 
            className={`p-2 rounded-md flex flex-col items-center ${isActive('/users') ? 'text-safesphere-red' : 'text-safesphere-white-muted/60'}`}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Users</span>
          </Link>
          <Link 
            to="/admin" 
            className={`p-2 rounded-md flex flex-col items-center ${isActive('/admin') ? 'text-safesphere-red' : 'text-safesphere-white-muted/60'}`}
          >
            <Server className="h-5 w-5" />
            <span className="text-xs mt-1">System</span>
          </Link>
          <Link 
            to="/settings" 
            className={`p-2 rounded-md flex flex-col items-center ${isActive('/settings') ? 'text-safesphere-red' : 'text-safesphere-white-muted/60'}`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

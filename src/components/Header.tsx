
import { Bell, Settings, User, LogOut, ShieldAlert, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import AnimatedTransition from './AnimatedTransition';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';

const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/models", label: "Models" },
    { to: "/settings", label: "Settings" },
    ...(isAdmin ? [{ to: "/admin", label: "Admin", admin: true }] : [])
  ];
  
  return (
    <AnimatedTransition 
      direction="down" 
      className="fixed top-0 left-0 right-0 z-10 bg-safesphere-darker/80 backdrop-blur-lg border-b border-white/5 py-3"
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light shadow-glow-sm"></div>
            <div className="absolute inset-[3px] rounded-full bg-safesphere-black flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-safesphere-red"></div>
            </div>
          </div>
          <div className="font-semibold text-xl text-safesphere-white tracking-tight">
            Safe<span className="text-safesphere-red">Sphere</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={cn(
                "nav-link", 
                location.pathname === link.to && "active",
                link.admin && "text-safesphere-purple"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              <button className="p-2 rounded-full button-hover relative" aria-label="Notifications">
                <Bell size={20} />
                <Badge className="absolute top-0 right-0 h-2 w-2 p-0 bg-safesphere-red" />
              </button>
              <Link to="/settings" className="p-2 rounded-full button-hover" aria-label="Settings">
                <Settings size={20} />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-full button-hover" aria-label="User profile">
                  <User size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-safesphere-dark-card border-white/10 text-safesphere-white">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-safesphere-dark-hover flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-safesphere-white-muted/60">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {isAdmin && (
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2 text-safesphere-white hover:bg-safesphere-dark-hover"
                      onClick={() => window.location.href = '/admin'}
                    >
                      <ShieldAlert size={16} className="text-safesphere-purple" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2 text-safesphere-white hover:bg-safesphere-dark-hover"
                    onClick={() => window.location.href = '/settings'}
                  >
                    <Settings size={16} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer flex items-center gap-2 text-safesphere-red hover:bg-safesphere-dark-hover"
                  >
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile Menu Toggle */}
              <Popover>
                <PopoverTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Menu size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 bg-safesphere-dark-card border-white/10 text-safesphere-white">
                  <div className="flex flex-col py-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={cn(
                          "flex items-center py-2 px-4 hover:bg-safesphere-dark-hover", 
                          location.pathname === link.to && "bg-safesphere-dark-hover",
                          link.admin && "text-safesphere-purple"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden md:flex items-center px-4 py-2 rounded-md bg-safesphere-red hover:bg-safesphere-red-light text-white">
                <LogOut size={16} className="mr-2" />
                Login
              </Link>
              
              {/* Mobile Login */}
              <Popover>
                <PopoverTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Menu size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0 bg-safesphere-dark-card border-white/10 text-safesphere-white">
                  <div className="flex flex-col py-2">
                    <Link
                      to="/login"
                      className="flex items-center gap-2 py-2 px-4 text-safesphere-red hover:bg-safesphere-dark-hover"
                    >
                      <LogOut size={16} />
                      Login
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Header;

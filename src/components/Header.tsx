
import { Bell, Settings, User, LogOut, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import AnimatedTransition from './AnimatedTransition';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  
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
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link", location.pathname === "/" && "active")}>
            Dashboard
          </Link>
          <Link to="/models" className={cn("nav-link", location.pathname === "/models" && "active")}>
            Models
          </Link>
          <Link to="/settings" className={cn("nav-link", location.pathname === "/settings" && "active")}>
            Settings
          </Link>
          {isAdmin && (
            <Link to="/admin" className={cn("nav-link", location.pathname === "/admin" && "active")}>
              Admin
            </Link>
          )}
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
                    <DropdownMenuItem as={Link} to="/admin" className="cursor-pointer flex items-center gap-2 text-safesphere-white hover:bg-safesphere-dark-hover">
                      <ShieldAlert size={16} className="text-safesphere-purple" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem as={Link} to="/settings" className="cursor-pointer flex items-center gap-2 text-safesphere-white hover:bg-safesphere-dark-hover">
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
            </>
          ) : (
            <Link to="/login" className="flex items-center px-4 py-2 rounded-md bg-safesphere-red hover:bg-safesphere-red-light text-white">
              <LogOut size={16} className="mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Header;

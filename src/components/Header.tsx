
import { Bell, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import AnimatedTransition from './AnimatedTransition';

const Header = () => {
  const location = useLocation();
  
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
        </nav>
        
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-full button-hover relative" aria-label="Notifications">
            <Bell size={20} />
            <Badge className="absolute top-0 right-0 h-2 w-2 p-0 bg-safesphere-red" />
          </button>
          <Link to="/settings" className="p-2 rounded-full button-hover" aria-label="Settings">
            <Settings size={20} />
          </Link>
          <button className="p-2 rounded-full button-hover" aria-label="User profile">
            <User size={20} />
          </button>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Header;

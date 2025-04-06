
import { Bell, Settings, User, LogOut, ShieldAlert, Menu, X, Home, Map, FileText, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import AnimatedTransition from './AnimatedTransition';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import NotificationsBadge from './NotificationsBadge';

const Header = ({ rightContent }: { rightContent?: React.ReactNode }) => {
  const location = useLocation();
  const { user, isAdmin } = useAuth(); // Using our dummy auth context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Listen for scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: Bell },
    { to: "/models", label: "Models", icon: FileText },
    { to: "/geofencing", label: "Geofencing", icon: Map },
    { to: "/settings", label: "Settings", icon: Settings },
    { to: "/admin", label: "Admin", icon: ShieldAlert }
  ];
  
  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };
  
  return (
    <AnimatedTransition 
      direction="down" 
      className={cn(
        "fixed top-0 left-0 right-0 z-10 bg-safesphere-darker/80 backdrop-blur-lg border-b border-white/5 py-3 transition-all duration-300",
        scrolled && "shadow-lg shadow-black/20"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            className="relative h-10 w-10 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light shadow-glow-sm"></div>
            <div className="absolute inset-[3px] rounded-full bg-safesphere-black flex items-center justify-center">
              <motion.div 
                className="w-2 h-2 rounded-full bg-safesphere-red"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </div>
          </motion.div>
          <motion.div 
            className="font-semibold text-xl text-safesphere-white tracking-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Safe<span className="text-safesphere-red">Sphere</span>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={link.to} 
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors",
                  location.pathname === link.to 
                    ? "bg-safesphere-dark-hover text-safesphere-white" 
                    : "text-safesphere-white-muted/60 hover:text-safesphere-white"
                )}
              >
                <link.icon size={16} />
                <span>{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <div className="flex items-center space-x-1">
          {rightContent}
          
          <Link to="/settings" className="p-2 rounded-full transition-colors hover:bg-safesphere-dark-hover" aria-label="Settings">
            <Settings size={20} />
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <motion.div 
                  className="h-8 w-8 rounded-full bg-safesphere-dark-hover flex items-center justify-center ring-2 ring-safesphere-red/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={16} />
                </motion.div>
              </Button>
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
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 text-safesphere-white hover:bg-safesphere-dark-hover"
                asChild
              >
                <Link to="/admin">
                  <ShieldAlert size={16} className="text-safesphere-purple" />
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 text-safesphere-white hover:bg-safesphere-dark-hover"
                asChild
              >
                <Link to="/settings">
                  <Settings size={16} />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          {/* Mobile Menu */}
          <motion.div 
            className={cn(
              "fixed inset-y-0 right-0 z-50 w-64 bg-safesphere-dark-card border-l border-white/10 shadow-xl md:hidden",
              !mobileMenuOpen && "pointer-events-none"
            )}
            variants={mobileMenuVariants}
            initial="closed"
            animate={mobileMenuOpen ? "open" : "closed"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-6">
                <div className="font-semibold text-safesphere-white">Menu</div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-lg",
                      location.pathname === link.to 
                        ? "bg-safesphere-dark-hover text-safesphere-white" 
                        : "text-safesphere-white-muted/60 hover:text-safesphere-white hover:bg-safesphere-dark-hover/50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <link.icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Header;

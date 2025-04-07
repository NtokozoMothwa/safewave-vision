
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import AnimatedTransition from './AnimatedTransition';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Menu,
  X,
  Settings,
  Shield,
  LogOut,
  User,
  ChevronDown,
  Home
} from 'lucide-react';
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

interface HeaderProps {
  rightContent?: React.ReactNode;
}

const Header = ({ rightContent }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatedTransition>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-safesphere-dark/90 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="relative h-8 w-8 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light shadow-glow-sm"></div>
              <div className="absolute inset-[2px] rounded-full bg-safesphere-black flex items-center justify-center">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-safesphere-red"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                ></motion.div>
              </div>
            </motion.div>
            <span className="text-xl font-bold">
              Safe<span className="text-safesphere-red">Sphere</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {rightContent}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-safesphere-dark-hover border border-white/10">
                        <User size={16} />
                        {isAdmin && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-safesphere-red flex items-center justify-center">
                            <Shield size={10} className="text-white" />
                          </span>
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-safesphere-dark-card border-white/10">
                    <DropdownMenuLabel className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-safesphere-white-muted/60">{user?.email}</span>
                      <Badge className={`mt-1 ${isAdmin ? 'bg-safesphere-red' : 'bg-safesphere-info'}`}>
                        {isAdmin ? 'Admin' : 'User'}
                      </Badge>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    
                    <DropdownMenuItem 
                      className="text-safesphere-white hover:bg-safesphere-dark-hover"
                      onClick={() => navigate('/settings')}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    
                    {isAdmin && (
                      <DropdownMenuItem 
                        className="text-safesphere-white hover:bg-safesphere-dark-hover"
                        onClick={() => navigate('/admin')}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator className="bg-white/10" />
                    
                    <DropdownMenuItem 
                      className="text-safesphere-warning hover:bg-safesphere-dark-hover"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/10 hover:bg-safesphere-dark-hover"
                  onClick={() => navigate('/')}
                >
                  <Home className="mr-1.5 h-4 w-4" />
                  <span>Home</span>
                </Button>
                <Button 
                  size="sm"
                  className="bg-safesphere-red hover:bg-safesphere-red-light"
                  onClick={() => navigate('/login')}
                >
                  <LogOut className="mr-1.5 h-4 w-4" />
                  <span>Login</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </AnimatedTransition>
  );
};

export default Header;

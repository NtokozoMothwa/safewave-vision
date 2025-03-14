
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import AnimatedTransition from "@/components/AnimatedTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh-pattern p-4">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full">
        <AnimatedTransition className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-safesphere-red to-safesphere-red-light/70 shadow-glow-sm animate-pulse"></div>
            <div className="absolute inset-[3px] rounded-full bg-safesphere-black flex items-center justify-center">
              <div className="text-3xl font-bold text-safesphere-red">404</div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-safesphere-white-muted/60 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-safesphere-red text-white text-sm button-hover"
          >
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default NotFound;

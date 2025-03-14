
import { SirenIcon, Phone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

const PanicButton: React.FC = () => {
  const [activating, setActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (activated) return;
    
    setActivating(true);
    
    const timeout = setTimeout(() => {
      setActivated(true);
      setActivating(false);
    }, 2000);
    
    setHoldTimeout(timeout);
  };

  const handleMouseUp = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      setHoldTimeout(null);
    }
    setActivating(false);
  };

  const handleCancel = () => {
    setActivated(false);
  };

  return (
    <AnimatedTransition delay={0.3} className="glass-card rounded-2xl p-5 relative overflow-hidden">
      <h2 className="text-lg font-semibold mb-3">Emergency Response</h2>
      
      <div className="mb-4 text-xs text-safesphere-white-muted/60">
        {activated 
          ? "Emergency services contacted. Help is on the way."
          : "Press and hold the button for 2 seconds to activate emergency response."
        }
      </div>
      
      <div className="flex justify-center">
        {!activated ? (
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className={cn(
              "relative w-20 h-20 rounded-full flex items-center justify-center",
              "transition-all duration-300 active:scale-95",
              activating ? "bg-safesphere-red shadow-glow-md" : "bg-safesphere-dark-hover hover:bg-safesphere-dark/80"
            )}
          >
            <div className={cn(
              "absolute inset-0 rounded-full",
              activating && "animate-pulse-ring bg-safesphere-red/20"
            )}></div>
            <SirenIcon className={cn(
              "w-8 h-8 transition-all duration-300",
              activating ? "text-white animate-pulse" : "text-safesphere-red"
            )} />
            
            {activating && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  className="text-safesphere-dark stroke-current"
                  strokeWidth="4"
                  strokeDasharray={283}
                  strokeDashoffset={0}
                  fill="none"
                  r="45"
                  cx="50%"
                  cy="50%"
                />
                <circle
                  className="text-safesphere-red stroke-current transition-all duration-200 ease-in-out"
                  strokeWidth="4"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (activating ? 283 : 0)}
                  fill="none"
                  r="45"
                  cx="50%"
                  cy="50%"
                />
              </svg>
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <div className="animate-glow w-20 h-20 rounded-full bg-safesphere-red flex items-center justify-center shadow-glow-lg">
              <SirenIcon className="w-8 h-8 text-white animate-pulse" />
            </div>
            
            <div className="mt-4 text-safesphere-white text-center">
              <div className="text-lg font-semibold animate-pulse text-safesphere-red">Emergency Activated</div>
              <div className="flex items-center justify-center mt-2 text-sm">
                <Phone size={14} className="mr-1" /> Contacting emergency services
              </div>
              <button 
                onClick={handleCancel}
                className="mt-4 px-4 py-1.5 rounded-lg bg-safesphere-dark-hover hover:bg-safesphere-dark text-sm button-hover"
              >
                Cancel Alert
              </button>
            </div>
          </div>
        )}
      </div>
      
      {!activated && (
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          <button className="px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-xs button-hover">
            Contact Emergency
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-xs button-hover">
            Alert Trusted Contacts
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-xs button-hover">
            Share Location
          </button>
        </div>
      )}
    </AnimatedTransition>
  );
};

export default PanicButton;

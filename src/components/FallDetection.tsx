import { useState, useEffect } from 'react';
import { PersonStanding, ArrowDown, History, Bell, BellRing } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface FallEvent {
  timestamp: string;
  confidence: number;
  falseAlarm: boolean;
}

const FallDetection: React.FC = () => {
  const [fallDetected, setFallDetected] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [fallHistory, setFallHistory] = useState<FallEvent[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [sensitivity, setSensitivity] = useState(75); // 0-100 scale
  
  const simulateMotionSensor = () => {
    if (Math.random() > 0.98) {
      return {
        isFall: true,
        confidence: Math.round(70 + Math.random() * 25)
      };
    }
    return { isFall: false, confidence: 0 };
  };

  const handleEmergencyResponse = (isRealEmergency: boolean) => {
    const newFallEvent: FallEvent = {
      timestamp: new Date().toLocaleTimeString(),
      confidence: Math.round(70 + Math.random() * 25),
      falseAlarm: !isRealEmergency
    };
    
    setFallHistory([newFallEvent, ...fallHistory.slice(0, 4)]);
    
    if (isRealEmergency) {
      toast.error("Emergency Services Alerted", {
        description: "Your emergency contacts have been notified of your fall.",
        duration: 10000,
      });
      
      console.log("FALL EMERGENCY: Contacting emergency services and designated contacts");
    } else {
      toast.info("Alert Cancelled", {
        description: "Thank you for confirming you're okay.",
      });
    }
    
    setFallDetected(false);
    setCountdown(15);
  };

  useEffect(() => {
    if (!fallDetected) return;
    
    if (countdown <= 0) {
      handleEmergencyResponse(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(count => count - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [fallDetected, countdown, fallHistory]);

  useEffect(() => {
    if (fallDetected || isTesting) return;
    
    const intervalId = setInterval(() => {
      const motionData = simulateMotionSensor();
      
      if (motionData.isFall && motionData.confidence >= sensitivity) {
        setFallDetected(true);
        toast.warning("Possible Fall Detected", {
          description: "Tap 'I'm OK' if you don't need help, or wait for emergency alert.",
        });
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [fallDetected, isTesting, sensitivity]);

  const testFallDetection = () => {
    setIsTesting(true);
    setFallDetected(true);
    
    toast.warning("TEST: Fall Detected", {
      description: "This is a test of the fall detection system.",
    });
    
    setTimeout(() => {
      if (isTesting) {
        setIsTesting(false);
        setFallDetected(false);
        setCountdown(15);
      }
    }, 20000);
  };

  return (
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Fall Detection</h2>
        <div className="text-xs px-2.5 py-1 rounded-full bg-safesphere-dark-hover text-safesphere-white-muted/60">
          {fallDetected ? "Alert Active" : "Monitoring"}
        </div>
      </div>
      
      {fallDetected ? (
        <div className="p-4 bg-safesphere-dark-hover rounded-lg mb-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-safesphere-red/20 flex items-center justify-center mb-3">
              <ArrowDown className="text-safesphere-red h-8 w-8 animate-pulse" />
            </div>
            
            <h3 className="text-lg font-medium mb-1">{isTesting ? "TEST: " : ""}Fall Detected</h3>
            <p className="text-sm text-safesphere-white-muted/80 mb-3">
              Are you okay? Emergency contacts will be alerted in <span className="font-bold text-safesphere-red">{countdown}</span> seconds
            </p>
            
            <div className="flex space-x-3">
              <Button 
                onClick={() => handleEmergencyResponse(false)}
                variant="outline" 
                className="bg-safesphere-dark border-white/10"
              >
                I'm OK
              </Button>
              
              <Button 
                onClick={() => handleEmergencyResponse(true)}
                className="bg-safesphere-red hover:bg-safesphere-red/80"
              >
                <BellRing className="mr-2 h-4 w-4" />
                Send Alert Now
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-safesphere-dark-hover rounded-lg mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-safesphere-success/20 flex items-center justify-center mr-3">
              <PersonStanding className="text-safesphere-success h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Activity Monitoring Active</p>
              <p className="text-xs text-safesphere-white-muted/60">Using motion sensors to detect falls</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={testFallDetection}
            className="text-xs border-white/10"
          >
            Test Alert
          </Button>
        </div>
      )}
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Sensitivity</h3>
          <span className="text-xs text-safesphere-white-muted/60">{sensitivity}%</span>
        </div>
        
        <input
          type="range"
          min="50"
          max="100"
          value={sensitivity}
          onChange={(e) => setSensitivity(parseInt(e.target.value))}
          className="w-full h-2 bg-safesphere-dark-hover rounded-lg appearance-none cursor-pointer"
          disabled={fallDetected}
        />
        
        <div className="flex justify-between text-xs text-safesphere-white-muted/40 mt-1">
          <span>Less Sensitive</span>
          <span>More Sensitive</span>
        </div>
      </div>
      
      {fallHistory.length > 0 && (
        <div>
          <div className="flex items-center mb-2">
            <History className="h-4 w-4 mr-1.5 text-safesphere-white-muted/60" />
            <h3 className="text-sm font-medium">Recent Detections</h3>
          </div>
          
          <div className="space-y-2 text-xs">
            {fallHistory.map((event, index) => (
              <div 
                key={index}
                className={cn(
                  "p-2 rounded-lg flex justify-between items-center",
                  event.falseAlarm 
                    ? "bg-safesphere-dark-hover" 
                    : "bg-safesphere-red/10 border border-safesphere-red/20"
                )}
              >
                <div className="flex items-center">
                  {event.falseAlarm ? (
                    <Bell className="h-3.5 w-3.5 mr-1.5 text-safesphere-white-muted/60" />
                  ) : (
                    <BellRing className="h-3.5 w-3.5 mr-1.5 text-safesphere-red" />
                  )}
                  <span>{event.timestamp}</span>
                </div>
                <div>
                  <span className={event.falseAlarm ? "text-safesphere-white-muted/60" : "text-safesphere-red"}>
                    {event.falseAlarm ? "False Alarm" : "Emergency Alerted"} ({event.confidence}% confidence)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AnimatedTransition>
  );
};

export default FallDetection;

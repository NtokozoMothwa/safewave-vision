
import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const VoiceCommand: React.FC = () => {
  const [listening, setListening] = useState(false);
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);
  
  const toggleListening = () => {
    if (!listening) {
      setListening(true);
      setCommandFeedback("Listening...");
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        const commands = [
          "Checking vitals now",
          "Emergency contact alerted",
          "Setting home as safe zone",
          "Activating silent alarm",
          "Help is on the way"
        ];
        
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        setCommandFeedback(randomCommand);
        
        toast("Voice Command Activated", {
          description: randomCommand,
        });
        
        // Turn off listening after command is processed
        setTimeout(() => {
          setListening(false);
          setCommandFeedback(null);
        }, 3000);
      }, 3000);
    } else {
      setListening(false);
      setCommandFeedback(null);
    }
  };
  
  // Easter egg: "Help me!" voice command simulation
  useEffect(() => {
    const helpMeTimeout = setTimeout(() => {
      if (Math.random() > 0.9) {
        setListening(true);
        setCommandFeedback("\"Help me!\" detected");
        
        setTimeout(() => {
          toast.error("Emergency Detected", {
            description: "Voice stress indicates emergency. Contacting emergency services.",
          });
          
          setTimeout(() => {
            setListening(false);
            setCommandFeedback(null);
          }, 3000);
        }, 1500);
      }
    }, 30000); // Random chance every 30 seconds
    
    return () => clearTimeout(helpMeTimeout);
  }, []);

  return (
    <AnimatedTransition className="glass-panel p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">Voice Commands</div>
        <div className={cn(
          "text-xs px-2 py-0.5 rounded",
          listening ? "bg-safesphere-red text-white" : "bg-safesphere-dark-hover text-safesphere-white-muted/60"
        )}>
          {listening ? "Listening" : "Ready"}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button 
            onClick={toggleListening}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              listening ? "bg-safesphere-red shadow-glow-sm" : "bg-safesphere-dark-hover hover:bg-safesphere-dark"
            )}
          >
            {listening ? 
              <Mic className="w-5 h-5 text-white animate-pulse" /> : 
              <MicOff className="w-5 h-5 text-safesphere-white-muted/60" />
            }
          </button>
          
          <div className="text-xs flex flex-col justify-center">
            <div className="text-safesphere-white-muted/80">
              {commandFeedback || "Tap to activate"}
            </div>
            <div className="text-safesphere-white-muted/40 text-[10px] mt-0.5">
              Try "Help me!" or "Check vitals"
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-safesphere-white-muted/60">
          <Volume2 size={14} />
          <span>On</span>
        </div>
      </div>
      
      {listening && (
        <div className="mt-3 flex justify-center">
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 bg-safesphere-red rounded-full animate-sound-wave-1"></div>
            <div className="w-1 h-5 bg-safesphere-red rounded-full animate-sound-wave-2"></div>
            <div className="w-1 h-8 bg-safesphere-red rounded-full animate-sound-wave-3"></div>
            <div className="w-1 h-5 bg-safesphere-red rounded-full animate-sound-wave-2"></div>
            <div className="w-1 h-3 bg-safesphere-red rounded-full animate-sound-wave-1"></div>
          </div>
        </div>
      )}
    </AnimatedTransition>
  );
};

export default VoiceCommand;

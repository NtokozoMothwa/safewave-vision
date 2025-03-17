
import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Shield, MapPin, Heart, Thermometer, AlertCircle } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CommandHistory {
  command: string;
  timestamp: Date;
  isEmergency: boolean;
}

const VoiceCommand: React.FC = () => {
  const [listening, setListening] = useState(false);
  const [commandFeedback, setCommandFeedback] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [voiceStressLevel, setVoiceStressLevel] = useState(0); // 0-100 scale
  
  // Function to detect emergency from voice stress
  const detectEmergencyFromVoice = (command: string): { isEmergency: boolean; stressLevel: number } => {
    // In a real app, this would use ML to analyze voice patterns
    // For simulation, we'll detect emergency keywords and use random stress
    const emergencyKeywords = [
      'help', 'emergency', 'danger', 'hurt', 'pain', 'fall', 'fell',
      'accident', 'scared', 'afraid', 'heart attack', 'breathing'
    ];
    
    const lowercaseCommand = command.toLowerCase();
    const containsEmergencyWord = emergencyKeywords.some(keyword => 
      lowercaseCommand.includes(keyword)
    );
    
    // Generate a stress level (higher if emergency keywords found)
    const baseStressLevel = containsEmergencyWord ? 60 : 20;
    const randomVariation = Math.floor(Math.random() * 30);
    const stressLevel = Math.min(100, baseStressLevel + randomVariation);
    
    return {
      isEmergency: containsEmergencyWord || stressLevel > 75,
      stressLevel
    };
  };
  
  // Process voice command
  const processCommand = (command: string) => {
    // Add to history
    const voiceAnalysis = detectEmergencyFromVoice(command);
    setVoiceStressLevel(voiceAnalysis.stressLevel);
    
    const newCommand: CommandHistory = {
      command,
      timestamp: new Date(),
      isEmergency: voiceAnalysis.isEmergency
    };
    
    setCommandHistory(prev => [newCommand, ...prev.slice(0, 4)]);
    
    // Respond based on command content
    let response = '';
    let isEmergency = false;
    
    if (command.toLowerCase().includes('help me')) {
      response = "Emergency detected! Contacting emergency services...";
      isEmergency = true;
    } else if (command.toLowerCase().includes('check vital') || command.toLowerCase().includes('health')) {
      response = "Your vitals are within normal ranges. Heart rate is 72 BPM.";
    } else if (command.toLowerCase().includes('location') || command.toLowerCase().includes('where')) {
      response = "You are currently at home, within your safe zone.";
    } else if (command.toLowerCase().includes('temperature') || command.toLowerCase().includes('weather')) {
      response = "The current temperature is 72°F with 60% humidity. Air quality is good.";
    } else if (command.toLowerCase().includes('call')) {
      if (command.toLowerCase().includes('emergency') || command.toLowerCase().includes('911')) {
        response = "Calling emergency services now...";
        isEmergency = true;
      } else {
        response = "Would you like me to call your emergency contact?";
      }
    } else if (voiceAnalysis.isEmergency) {
      response = "I detect distress in your voice. Do you need emergency assistance?";
      isEmergency = true;
    } else {
      response = "I'm sorry, I didn't understand that command. Please try again.";
    }
    
    setCommandFeedback(response);
    
    // Handle emergency situations
    if (isEmergency) {
      toast.error("Emergency Voice Command Detected", {
        description: "Emergency contacts are being notified based on your voice command.",
        duration: 10000,
      });
      
      // In a real app, this would trigger the emergency response system
      console.log("VOICE EMERGENCY: Emergency detected through voice command");
    } else {
      toast("Command Processed", {
        description: response,
      });
    }
    
    // End listening after processing
    setTimeout(() => {
      setListening(false);
      setCommandFeedback(null);
    }, 5000);
  };
  
  const toggleListening = () => {
    if (!listening) {
      setListening(true);
      setCommandFeedback("Listening...");
      
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        const commands = [
          "Check my vitals",
          "Where am I right now?",
          "What's the temperature?",
          "Help me, I don't feel well",
          "Call my emergency contact"
        ];
        
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        processCommand(randomCommand);
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
          processCommand("Help me!");
        }, 1500);
      }
    }, 30000); // Random chance every 30 seconds
    
    return () => clearTimeout(helpMeTimeout);
  }, []);

  return (
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">Voice Commands</div>
        <div className={cn(
          "text-xs px-2 py-0.5 rounded",
          listening ? "bg-safesphere-red text-white" : "bg-safesphere-dark-hover text-safesphere-white-muted/60"
        )}>
          {listening ? "Listening" : "Ready"}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          <button 
            onClick={toggleListening}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              listening ? "bg-safesphere-red shadow-glow-sm" : "bg-safesphere-dark-hover hover:bg-safesphere-dark"
            )}
          >
            {listening ? 
              <Mic className="w-5 h-5 text-white animate-pulse" /> : 
              <MicOff className="w-5 h-5 text-safesphere-white-muted/60" />
            }
          </button>
          
          <div className="text-sm flex flex-col justify-center">
            <div className="text-safesphere-white">
              {commandFeedback || "Tap to activate"}
            </div>
            <div className="text-safesphere-white-muted/40 text-xs mt-0.5">
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
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 bg-safesphere-red rounded-full animate-sound-wave-1"></div>
            <div className="w-1 h-5 bg-safesphere-red rounded-full animate-sound-wave-2"></div>
            <div className="w-1 h-8 bg-safesphere-red rounded-full animate-sound-wave-3"></div>
            <div className="w-1 h-5 bg-safesphere-red rounded-full animate-sound-wave-2"></div>
            <div className="w-1 h-3 bg-safesphere-red rounded-full animate-sound-wave-1"></div>
          </div>
        </div>
      )}
      
      {voiceStressLevel > 0 && (
        <div className="mb-4 p-3 bg-safesphere-dark-hover rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-medium">Voice Stress Analysis</div>
            <div className={cn(
              "text-xs",
              voiceStressLevel > 75 ? "text-safesphere-red" :
              voiceStressLevel > 50 ? "text-safesphere-warning" :
              "text-safesphere-success"
            )}>
              {voiceStressLevel > 75 ? "High" :
               voiceStressLevel > 50 ? "Medium" :
               "Low"} ({voiceStressLevel}%)
            </div>
          </div>
          
          <div className="w-full bg-safesphere-dark rounded-full h-1.5">
            <div 
              className={cn(
                "h-1.5 rounded-full",
                voiceStressLevel > 75 ? "bg-safesphere-red" :
                voiceStressLevel > 50 ? "bg-safesphere-warning" :
                "bg-safesphere-success"
              )}
              style={{ width: `${voiceStressLevel}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {commandHistory.length > 0 && (
        <div>
          <div className="text-xs font-medium mb-2">Recent Commands</div>
          <div className="space-y-2">
            {commandHistory.map((cmd, index) => (
              <div 
                key={index}
                className={cn(
                  "text-xs p-2 rounded-lg flex items-center gap-2",
                  cmd.isEmergency ? "bg-safesphere-red/10 border border-safesphere-red/20" : "bg-safesphere-dark-hover"
                )}
              >
                {cmd.isEmergency ? (
                  <AlertCircle size={12} className="text-safesphere-red shrink-0" />
                ) : (
                  <Mic size={12} className="text-safesphere-white-muted/60 shrink-0" />
                )}
                <span className={cmd.isEmergency ? "text-safesphere-red" : "text-safesphere-white-muted/80"}>
                  "{cmd.command}"
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 rounded-lg border border-dashed border-safesphere-white/10 bg-safesphere-dark/30">
        <div className="text-xs text-safesphere-white-muted/60">
          <div className="font-medium mb-1">Quick Command Ideas</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <Shield size={10} className="text-safesphere-red" />
              "Help me!"
            </div>
            <div className="flex items-center gap-1">
              <Heart size={10} className="text-safesphere-red" />
              "Check my vitals"
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={10} className="text-safesphere-info" />
              "Where am I?"
            </div>
            <div className="flex items-center gap-1">
              <Thermometer size={10} className="text-safesphere-success" />
              "Current temperature"
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default VoiceCommand;

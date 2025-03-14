
import { useState } from 'react';
import { Crown, ShieldCheck, Activity, Orbit } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="flex gap-3 mb-3 last:mb-0">
      <div className="mt-0.5 text-safesphere-info">{icon}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-safesphere-white-muted/60 mt-0.5">{description}</div>
      </div>
    </div>
  );
};

const LuxuryModeToggle: React.FC = () => {
  const [luxuryMode, setLuxuryMode] = useState(false);
  
  const handleToggle = () => {
    const newMode = !luxuryMode;
    setLuxuryMode(newMode);
    
    if (newMode) {
      toast("SafeSphere LUXURY Activated", {
        description: "Enhanced features are now available.",
      });
    } else {
      toast("Returning to Standard Mode", {
        description: "LUXURY features deactivated.",
      });
    }
  };

  return (
    <AnimatedTransition className="glass-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-amber-400" />
          <h2 className="text-lg font-semibold">SafeSphere LUXURY</h2>
        </div>
        <Switch 
          checked={luxuryMode} 
          onCheckedChange={handleToggle}
          className={luxuryMode ? "bg-amber-400" : "bg-safesphere-dark-hover"}
        />
      </div>
      
      <div className="mb-4 text-xs text-safesphere-white-muted/70">
        {luxuryMode ? 
          "Premium features activated. Enjoy your enhanced SafeSphere experience." : 
          "Upgrade to LUXURY mode for premium features and enhanced monitoring."
        }
      </div>
      
      <div className={`space-y-2 p-3 rounded-lg border border-dashed ${
        luxuryMode ? "border-amber-400/30 bg-amber-400/5" : "border-safesphere-white/10 bg-safesphere-dark/30"
      }`}>
        <Feature 
          icon={<Activity size={16} />}
          title="Enhanced Stress Monitoring"
          description="Advanced AI stress pattern detection for business professionals"
        />
        <Feature 
          icon={<ShieldCheck size={16} />}
          title="Executive Security Protocol"
          description="Priority emergency response and advanced threat detection"
        />
        <Feature 
          icon={<Orbit size={16} />}
          title="Global Connectivity"
          description="Worldwide cellular connectivity with no roaming fees"
        />
      </div>
    </AnimatedTransition>
  );
};

export default LuxuryModeToggle;

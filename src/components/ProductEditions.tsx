
import { Child, Briefcase, Heart, Crown, Star, ChevronRight } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type EditionType = 'standard' | 'kiddies' | 'luxury' | 'medical';

interface EditionFeature {
  name: string;
  included: boolean;
}

interface Edition {
  id: EditionType;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: EditionFeature[];
  price: string;
  active: boolean;
}

const ProductEditions: React.FC = () => {
  const editions: Edition[] = [
    {
      id: 'standard',
      name: 'SafeSphere Standard',
      description: 'All the essential safety and health monitoring features',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-safesphere-info',
      features: [
        { name: 'Fall Detection & Alerts', included: true },
        { name: 'Basic Vital Monitoring', included: true },
        { name: 'Emergency Panic Button', included: true },
        { name: 'Location Tracking', included: true },
        { name: 'Basic AI Health Insights', included: true },
      ],
      price: '$9.99/month',
      active: true
    },
    {
      id: 'kiddies',
      name: 'SafeSphere KIDDIES',
      description: 'Kid-friendly design with parental controls & school safety',
      icon: <Child className="h-6 w-6" />,
      color: 'bg-safesphere-success',
      features: [
        { name: 'School Geofencing', included: true },
        { name: 'Parental Dashboard', included: true },
        { name: 'Gamified Health Goals', included: true },
        { name: 'Anti-Removal Protection', included: true },
        { name: 'Quiet School Mode', included: true },
      ],
      price: '$12.99/month',
      active: false
    },
    {
      id: 'luxury',
      name: 'SafeSphere LUXURY',
      description: 'Premium design with enhanced features for professionals',
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-safesphere-purple',
      features: [
        { name: 'Stress & Recovery Analysis', included: true },
        { name: 'Executive Design & Materials', included: true },
        { name: 'Advanced AI Assistant', included: true },
        { name: 'Priority Emergency Response', included: true },
        { name: 'VIP Concierge Services', included: true },
      ],
      price: '$29.99/month',
      active: false
    },
    {
      id: 'medical',
      name: 'SafeSphere MEDICAL',
      description: 'Advanced monitoring for elderly users & patients',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-safesphere-red',
      features: [
        { name: 'Advanced ECG Monitoring', included: true },
        { name: 'Medication Reminders', included: true },
        { name: 'Healthcare Provider Integration', included: true },
        { name: 'Automatic Fall Detection+', included: true },
        { name: 'Hydration & Nutrition Tracking', included: true },
      ],
      price: '$19.99/month',
      active: false
    }
  ];

  const handleEditionSelect = (edition: EditionType) => {
    toast.info(`${edition.charAt(0).toUpperCase() + edition.slice(1)} Edition Selected`, {
      description: `You've selected the SafeSphere ${edition.toUpperCase()} edition. This is a prototype.`,
    });
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <Crown className="h-5 w-5 text-safesphere-warning" />
        <h2 className="text-lg font-semibold">SafeSphere Editions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editions.map((edition, index) => (
          <AnimatedTransition 
            key={edition.id} 
            direction="up" 
            delay={index * 0.1}
            className={cn(
              "glass-panel rounded-lg p-4 border",
              edition.active ? "border-safesphere-primary" : "border-transparent"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", edition.color)}>
                  {edition.icon}
                </div>
                <div>
                  <h3 className="font-medium">{edition.name}</h3>
                  <p className="text-xs text-safesphere-white-muted/60">{edition.description}</p>
                </div>
              </div>
              {edition.active && (
                <div className="text-[10px] px-1.5 py-0.5 rounded-full bg-safesphere-primary/20 text-safesphere-primary">
                  CURRENT
                </div>
              )}
            </div>
            
            <div className="space-y-2 mb-4">
              {edition.features.map((feature, i) => (
                <div key={i} className="flex items-center text-xs">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full mr-2",
                    feature.included ? "bg-safesphere-success" : "bg-safesphere-white-muted/20"
                  )} />
                  <span className={!feature.included ? "text-safesphere-white-muted/40" : ""}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">{edition.price}</div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs bg-safesphere-dark border-white/10"
                onClick={() => handleEditionSelect(edition.id)}
                disabled={edition.active}
              >
                {edition.active ? 'Current Plan' : 'Switch Plan'}
                {!edition.active && <ChevronRight className="ml-1 h-3 w-3" />}
              </Button>
            </div>
          </AnimatedTransition>
        ))}
      </div>
    </div>
  );
};

export default ProductEditions;

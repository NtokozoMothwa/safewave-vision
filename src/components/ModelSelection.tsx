
import { CheckIcon, ChevronRight, ShieldIcon, HeartPulse, Baby, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';

interface ModelCardProps {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  features: string[];
  isActive?: boolean;
  delay?: number;
}

const ModelCard: React.FC<ModelCardProps> = ({
  title,
  subtitle,
  description,
  color,
  icon,
  features,
  isActive = false,
  delay = 0
}) => {
  return (
    <AnimatedTransition 
      delay={delay}
      className={cn(
        "glass-card rounded-2xl overflow-hidden border",
        isActive ? "border-safesphere-red" : "border-white/5",
        "transition-all duration-300 hover:border-white/10"
      )}
    >
      <div className={cn("h-2", color)} />
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-xs text-safesphere-white-muted/60">{subtitle}</p>
          </div>
          <div className={cn("p-2 rounded-full", color)}>
            {icon}
          </div>
        </div>
        
        <p className="mt-3 text-sm text-safesphere-white-muted/80">{description}</p>
        
        <div className="mt-4 space-y-2">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start text-xs">
              <CheckIcon size={12} className="mr-2 mt-0.5 text-safesphere-success" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-5 flex justify-between items-center">
          {isActive ? (
            <span className="text-xs text-safesphere-success flex items-center">
              <CheckIcon size={12} className="mr-1" /> Active Model
            </span>
          ) : (
            <Link 
              to="#" 
              className="text-xs text-safesphere-white-muted hover:text-safesphere-white transition-colors"
            >
              Switch to this model
            </Link>
          )}
          
          <Link 
            to="#" 
            className="text-xs text-safesphere-white-muted/60 hover:text-safesphere-white transition-colors flex items-center"
          >
            Details <ChevronRight size={12} className="ml-0.5" />
          </Link>
        </div>
      </div>
    </AnimatedTransition>
  );
};

const ModelSelection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ModelCard
        title="Standard"
        subtitle="For General Use"
        description="The balanced SafeSphere experience with all essential safety and health monitoring features."
        color="bg-safesphere-info"
        icon={<ShieldIcon size={20} className="text-white" />}
        features={[
          "Safety alerts & monitoring",
          "Basic health vitals tracking",
          "Emergency response",
          "7-day battery life"
        ]}
        isActive={true}
        delay={0.1}
      />
      
      <ModelCard
        title="Kiddies"
        subtitle="Child Safety Focus"
        description="Designed specifically for children with playful interface and enhanced location tracking."
        color="bg-safesphere-warning"
        icon={<Baby size={20} className="text-white" />}
        features={[
          "Real-time location updates",
          "Safe zone alerts",
          "Fun, game-like interface",
          "Durable, water-resistant design"
        ]}
        delay={0.2}
      />
      
      <ModelCard
        title="Medical"
        subtitle="Enhanced Health Monitoring"
        description="Advanced health tracking for elderly users or those with specific medical needs."
        color="bg-safesphere-success"
        icon={<HeartPulse size={20} className="text-white" />}
        features={[
          "ECG & heart health monitoring",
          "Medication reminders",
          "Fall detection with auto-alert",
          "Extended health reports"
        ]}
        delay={0.3}
      />
      
      <ModelCard
        title="Luxury"
        subtitle="Premium Experience"
        description="The ultimate SafeSphere experience with premium materials and exclusive features."
        color="bg-safesphere-red"
        icon={<Gem size={20} className="text-white" />}
        features={[
          "Premium titanium construction",
          "Advanced AI health insights",
          "Personalized wellness coaching",
          "Concierge emergency services"
        ]}
        delay={0.4}
      />
    </div>
  );
};

export default ModelSelection;


import { Code, Cloud, Server, Shield, Smartphone } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';

interface TechItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  technologies: string[];
  color: string;
  delay?: number;
}

const TechItem: React.FC<TechItemProps> = ({
  icon,
  title,
  description,
  technologies,
  color,
  delay = 0
}) => {
  return (
    <AnimatedTransition delay={delay} className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className={`text-${color}`}>{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <p className="text-sm text-safesphere-white-muted/70 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span 
            key={index}
            className={cn(
              "px-2 py-1 text-xs rounded-full",
              `bg-${color}/10 border border-${color}/20 text-${color}`
            )}
          >
            {tech}
          </span>
        ))}
      </div>
    </AnimatedTransition>
  );
};

const TechStack: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TechItem
        icon={<Smartphone size={18} />}
        title="Frontend"
        description="Cross-platform mobile and web interfaces with real-time updates"
        technologies={["React", "React Native", "Flutter", "Tailwind CSS"]}
        color="safesphere-info"
        delay={0.1}
      />
      
      <TechItem
        icon={<Server size={18} />}
        title="Backend"
        description="Scalable server architecture for processing health and safety data"
        technologies={["Firebase", "Node.js", "Express", "REST API"]}
        color="safesphere-success"
        delay={0.2}
      />
      
      <TechItem
        icon={<Code size={18} />}
        title="AI Integration"
        description="Machine learning algorithms for predictive health monitoring"
        technologies={["Python", "TensorFlow", "Predictive Analytics"]}
        color="safesphere-purple"
        delay={0.3}
      />
      
      <TechItem
        icon={<Cloud size={18} />}
        title="Cloud & Database"
        description="Real-time data storage and processing infrastructure"
        technologies={["Google Cloud", "AWS", "IoT Services", "Real-time DB"]}
        color="safesphere-warning"
        delay={0.4}
      />
      
      <TechItem
        icon={<Shield size={18} />}
        title="Security"
        description="End-to-end encryption and secure authentication protocols"
        technologies={["E2E Encryption", "OAuth 2.0", "GDPR Compliance"]}
        color="safesphere-red"
        delay={0.5}
      />
    </div>
  );
};

export default TechStack;


import { Code, Cloud, Server, Shield, Smartphone } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="space-y-6">
      <Tabs defaultValue="current" className="w-full">
        <TabsList className="glass-panel grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="current">Current Implementation</TabsTrigger>
          <TabsTrigger value="planned">Planned Enhancements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="planned" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TechItem
              icon={<Smartphone size={18} />}
              title="Advanced Mobile"
              description="Enhanced mobile applications with offline capabilities"
              technologies={["React Native Reanimated", "Push Notifications", "Offline Mode"]}
              color="safesphere-info"
              delay={0.1}
            />
            
            <TechItem
              icon={<Server size={18} />}
              title="Serverless Architecture"
              description="Fully serverless backend for unlimited scalability"
              technologies={["Firebase Functions", "AWS Lambda", "Microservices"]}
              color="safesphere-success"
              delay={0.2}
            />
            
            <TechItem
              icon={<Code size={18} />}
              title="Advanced AI"
              description="Deep learning models for sophisticated health predictions"
              technologies={["TensorFlow Extended", "Neural Networks", "Time Series Analysis"]}
              color="safesphere-purple"
              delay={0.3}
            />
            
            <TechItem
              icon={<Cloud size={18} />}
              title="Edge Computing"
              description="Processing data closer to the source for faster response times"
              technologies={["Edge Computing", "Distributed Systems", "Low-Latency Processing"]}
              color="safesphere-warning"
              delay={0.4}
            />
            
            <TechItem
              icon={<Shield size={18} />}
              title="Enhanced Security"
              description="Military-grade security features for complete data protection"
              technologies={["Biometric Auth", "Zero-Knowledge Proofs", "Quantum-Resistant Encryption"]}
              color="safesphere-red"
              delay={0.5}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 p-4 rounded-lg border border-dashed border-safesphere-white/10 bg-safesphere-dark/30">
        <div className="text-xs text-safesphere-white-muted/70">
          <p className="mb-2">SafeWave Vision is built with modern technologies that prioritize security, real-time data processing, and cross-platform compatibility.</p>
          <p>Our tech stack allows for seamless integration of health tracking, location services, and AI-powered alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default TechStack;

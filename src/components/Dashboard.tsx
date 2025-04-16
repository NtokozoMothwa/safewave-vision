
import { Link } from 'react-router-dom';
import { BarChart3, ThermometerSnowflake, MapPin, Navigation, Code, Brain, Shield, Bell, BookOpen } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import VitalsDisplay from './VitalsDisplay';
import AlertsPanel from './AlertsPanel';
import PanicButton from './PanicButton';
import AIInsights from './AIInsights';
import EnvironmentMonitor from './EnvironmentMonitor';
import EnvironmentAlertHistory from './EnvironmentAlertHistory';
import VoiceCommand from './VoiceCommand';
import LuxuryModeToggle from './LuxuryModeToggle';
import LocationTracking from './LocationTracking';
import GeofencingMap from './GeofencingMap';
import TechStack from './TechStack';
import FallDetection from './FallDetection';
import PredictiveInsights from './PredictiveInsights';
import SecurityControls from './SecurityControls';
import UserGuidePanel from './UserGuidePanel';
import ProductEditions from './ProductEditions';
import ApiStatus from './ApiStatus';
import IntelligencePanel from "./IntelligencePanel";

// Add this inside your return JSX:
<IntelligencePanel
  lastAlert="Panic button triggered"
  activeThreats={["Unidentified movement", "Unauthorized device"]}
  zone="Zone B - Urban District"
  time={new Date().toLocaleString()}
  location="Corner of 4th & Pine"
/>

const Dashboard: React.FC = () => {
  return (
    <AnimatedTransition className="max-w-7xl mx-auto">
      <div className="px-4 pt-20 pb-10">
        <AnimatedTransition direction="up" className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-safesphere-white-muted/60 mt-2">
            Monitor your health metrics and safety status in real-time
          </p>
        </AnimatedTransition>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Health Vitals</h2>
            <Link 
              to="/health-history" 
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
            >
              <BarChart3 size={14} /> View History
            </Link>
          </div>
          <VitalsDisplay />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FallDetection />
          <div className="space-y-6">
            <VoiceCommand />
            <PanicButton />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">AI-Powered Health Insights</h2>
            <div className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60">
              <Brain size={14} /> Learning from your patterns
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PredictiveInsights />
            <AlertsPanel />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Environmental Conditions</h2>
            <div className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60">
              <ThermometerSnowflake size={14} /> Updated just now
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnvironmentMonitor />
            <EnvironmentAlertHistory />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Location & Safety</h2>
            <Link 
              to="/geofencing" 
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
            >
              <MapPin size={14} /> Manage Geofences
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationTracking />
            <GeofencingMap />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">API & System Status</h2>
            <Link 
              to="/api-docs" 
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
            >
              <Code size={14} /> View API Documentation
            </Link>
          </div>
          <ApiStatus />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Security & Privacy</h2>
            <div className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60">
              <Shield size={14} /> End-to-End Encrypted
            </div>
          </div>
          <SecurityControls />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Plan & Subscription</h2>
            <Link 
              to="/models" 
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60 hover:text-safesphere-white button-hover"
            >
              <Navigation size={14} /> Explore All Models
            </Link>
          </div>
          <ProductEditions />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Help & Documentation</h2>
            <div className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60">
              <BookOpen size={14} /> User Guide
            </div>
          </div>
          <UserGuidePanel />
        </div>
        
        <div className="mb-6">
          <AIInsights />
        </div>
        
        <div className="mb-6">
          <LuxuryModeToggle />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Technology Stack</h2>
            <div className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-safesphere-dark-hover text-safesphere-white-muted/60">
              <Code size={14} /> Current Implementation
            </div>
          </div>
          <TechStack />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default Dashboard;

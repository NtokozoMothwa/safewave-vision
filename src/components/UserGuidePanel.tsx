
import { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Info, AlertTriangle, PanelLeft, Settings, HelpCircle } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
}

const UserGuidePanel: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  const guideSections: GuideSection[] = [
    {
      id: 'vitals',
      title: 'Health Vitals Monitoring',
      icon: <Info className="h-4 w-4 text-safesphere-info" />,
      content: `
        SafeSphere continuously monitors your vital signs including heart rate, blood oxygen, 
        and temperature. If any vitals go outside of normal ranges, you'll receive an immediate notification.
        
        Heart rate is measured every 5 minutes during normal activity and continuously during exercise.
        You can view your historical data by tapping "View History" on the dashboard.
      `
    },
    {
      id: 'fall',
      title: 'Fall Detection & Emergency Response',
      icon: <AlertTriangle className="h-4 w-4 text-safesphere-warning" />,
      content: `
        The fall detection system uses motion sensors to detect potential falls. If a fall is detected,
        a 15-second countdown begins. If you don't respond by tapping "I'm OK," emergency contacts
        will automatically be notified with your GPS location.
        
        You can adjust the sensitivity of fall detection in the settings panel to reduce false alarms.
        The "Test Alert" button lets you simulate a fall to ensure the system is working properly.
      `
    },
    {
      id: 'geofencing',
      title: 'Location Tracking & Geofencing',
      icon: <PanelLeft className="h-4 w-4 text-safesphere-success" />,
      content: `
        You can set up safe zones (geofences) for yourself or loved ones. If the wearer leaves the
        designated safe area, alerts will be sent to emergency contacts. The app shows the current location
        and movement history.
        
        Go to "Manage Geofences" to create custom safe zones around important locations like home,
        school, or work. You can set different alert settings for each geofence.
      `
    },
    {
      id: 'privacy',
      title: 'Privacy & Security Settings',
      icon: <Settings className="h-4 w-4 text-safesphere-purple" />,
      content: `
        SafeSphere takes your privacy seriously. All data is encrypted end-to-end, and you have
        complete control over what information is shared and with whom.
        
        You can control location sharing, health data sharing, and set custom data retention periods.
        By default, biometric authentication is enabled for app access, providing an extra layer of security.
      `
    }
  ];
  
  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <BookOpen className="h-5 w-5 text-safesphere-info" />
        <h2 className="text-lg font-semibold">User Guide</h2>
      </div>
      
      <div className="space-y-3">
        {guideSections.map((section) => (
          <div key={section.id} className="glass-panel rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span className="font-medium text-sm">{section.title}</span>
              </div>
              {openSection === section.id ? (
                <ChevronDown className="h-4 w-4 text-safesphere-white-muted/60" />
              ) : (
                <ChevronRight className="h-4 w-4 text-safesphere-white-muted/60" />
              )}
            </button>
            
            {openSection === section.id && (
              <AnimatedTransition direction="down" className="px-4 pb-4 text-xs text-safesphere-white-muted/80 whitespace-pre-line">
                {section.content}
              </AnimatedTransition>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-5 flex justify-center">
        <Button variant="outline" className="bg-safesphere-dark border-white/10 text-xs">
          <HelpCircle className="mr-1.5 h-4 w-4" />
          View Complete User Manual
        </Button>
      </div>
    </div>
  );
};

export default UserGuidePanel;

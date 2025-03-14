
import Header from '@/components/Header';
import SettingsPanel from '@/components/SettingsPanel';
import AnimatedTransition from '@/components/AnimatedTransition';

const Settings = () => {
  return (
    <div className="min-h-screen bg-mesh-pattern">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <AnimatedTransition direction="up" className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-safesphere-white-muted/60 mt-2">
            Customize your SafeSphere experience and privacy preferences
          </p>
        </AnimatedTransition>
        
        <SettingsPanel />
      </div>
    </div>
  );
};

export default Settings;

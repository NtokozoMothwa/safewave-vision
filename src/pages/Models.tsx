
import Header from '@/components/Header';
import ModelSelection from '@/components/ModelSelection';
import AnimatedTransition from '@/components/AnimatedTransition';

const Models = () => {
  return (
    <div className="min-h-screen bg-mesh-pattern">
      <Header />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <AnimatedTransition direction="up" className="mb-8">
          <h1 className="text-3xl font-bold">SafeSphere Models</h1>
          <p className="text-safesphere-white-muted/60 mt-2">
            Choose the perfect SafeSphere model for your needs
          </p>
        </AnimatedTransition>
        
        <ModelSelection />
        
        <AnimatedTransition delay={0.5} className="mt-10 glass-card rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-3">Model Comparison</h2>
          <p className="text-sm text-safesphere-white-muted/70">
            Each SafeSphere model is designed with specific users in mind, while maintaining our core commitment to safety and health monitoring. Compare models to find your perfect fit.
          </p>
          
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left font-medium text-safesphere-white-muted/60">Feature</th>
                  <th className="py-3 text-center font-medium text-safesphere-info">Standard</th>
                  <th className="py-3 text-center font-medium text-safesphere-warning">Kiddies</th>
                  <th className="py-3 text-center font-medium text-safesphere-success">Medical</th>
                  <th className="py-3 text-center font-medium text-safesphere-red">Luxury</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3">Health Monitoring</td>
                  <td className="py-3 text-center">Basic</td>
                  <td className="py-3 text-center">Basic</td>
                  <td className="py-3 text-center">Advanced</td>
                  <td className="py-3 text-center">Premium</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Battery Life</td>
                  <td className="py-3 text-center">7 days</td>
                  <td className="py-3 text-center">5 days</td>
                  <td className="py-3 text-center">5 days</td>
                  <td className="py-3 text-center">10 days</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Water Resistance</td>
                  <td className="py-3 text-center">5 ATM</td>
                  <td className="py-3 text-center">10 ATM</td>
                  <td className="py-3 text-center">5 ATM</td>
                  <td className="py-3 text-center">10 ATM</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">AI Insights</td>
                  <td className="py-3 text-center">Basic</td>
                  <td className="py-3 text-center">Child-focused</td>
                  <td className="py-3 text-center">Health-focused</td>
                  <td className="py-3 text-center">Comprehensive</td>
                </tr>
                <tr>
                  <td className="py-3">Emergency Response</td>
                  <td className="py-3 text-center">Standard</td>
                  <td className="py-3 text-center">Child Safety</td>
                  <td className="py-3 text-center">Medical</td>
                  <td className="py-3 text-center">Premium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Models;

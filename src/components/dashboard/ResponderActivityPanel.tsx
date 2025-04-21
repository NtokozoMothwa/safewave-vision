
import React from 'react';

interface ResponderActivityPanelProps {
  // Add props as needed
}

const ResponderActivityPanel: React.FC<ResponderActivityPanelProps> = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Responder Activity</h2>
      <div className="space-y-2">
        <div className="p-2 bg-gray-100 rounded">
          <p className="text-sm">Officer Johnson responding to Zone A alert</p>
          <p className="text-xs text-gray-500">2 minutes ago</p>
        </div>
        <div className="p-2 bg-gray-100 rounded">
          <p className="text-sm">New responder assigned to incident #45</p>
          <p className="text-xs text-gray-500">15 minutes ago</p>
        </div>
      </div>
    </div>
  );
};

export default ResponderActivityPanel;

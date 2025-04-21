
import React from 'react';

interface ResponderConnectPanelProps {
  // Add props as needed
}

const ResponderConnectPanel: React.FC<ResponderConnectPanelProps> = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Responder Connect</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-green-100 rounded">
          <span>Officer Smith</span>
          <span className="px-2 py-1 text-xs bg-green-500 text-white rounded">Online</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
          <span>Officer Johnson</span>
          <span className="px-2 py-1 text-xs bg-green-500 text-white rounded">Online</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
          <span>Officer Davis</span>
          <span className="px-2 py-1 text-xs bg-red-500 text-white rounded">Offline</span>
        </div>
      </div>
    </div>
  );
};

export default ResponderConnectPanel;

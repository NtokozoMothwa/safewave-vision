import React from 'react';
import { useSmartAlert } from '@/hooks/useSmartAlert';
import { Button } from '@/components/ui/button';
import { jumpToLocation } from '@/utils/map';

const ResponderPanel = () => {
  const { alerts, removeAlert } = useSmartAlert();

  const confirmAlert = (id: string) => {
    // Future: send confirmation to backend
    alert(`Alert ${id} confirmed.`);
    removeAlert(id);
  };

  const escalateAlert = (id: string) => {
    alert(`Alert ${id} escalated to emergency services.`);
    removeAlert(id);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Responder Panel</h2>

      {alerts.length === 0 ? (
        <p className="text-gray-500">No active alerts</p>
      ) : (
        alerts.map((alert) => (
          <div key={alert.id} className="border rounded-lg p-4 mb-4">
            <p className="font-bold text-red-600">{alert.type.toUpperCase()} Alert</p>
            <p className="text-gray-800">{alert.message}</p>
            <div className="flex gap-2 mt-2">
  <Button onClick={() => confirmAlert(alert.id)} className="bg-green-600 hover:bg-green-700 text-white">
    Confirm
  </Button>
  <Button onClick={() => escalateAlert(alert.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white">
    Escalate
  </Button>
  <Button
    onClick={() => jumpToLocation(alert.latitude, alert.longitude)}
    className="bg-blue-600 hover:bg-blue-700 text-white"
  >
    Locate
  </Button>
</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResponderPanel;

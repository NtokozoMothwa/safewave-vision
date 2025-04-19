import { useState } from 'react';
import socket from '@/utils/socket';

const TriggerPanel = () => {
  const [incidentMessage, setIncidentMessage] = useState('');

  const triggerIncident = (type: string) => {
    socket.emit('trigger:incident', { type, message: incidentMessage });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Emergency Trigger Panel</h2>

      <input
        type="text"
        placeholder="Enter incident message..."
        value={incidentMessage}
        onChange={(e) => setIncidentMessage(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <div className="space-x-4">
        <button
          onClick={() => triggerIncident('responder')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send to Responders
        </button>
        <button
          onClick={() => triggerIncident('guard')}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Send to Guards
        </button>
        <button
          onClick={() => triggerIncident('admin')}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Send Log to Admins
        </button>
      </div>
    </div>
  );
};

export default TriggerPanel;

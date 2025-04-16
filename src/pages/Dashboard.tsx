import AlertList from "@/components/dashboard/AlertList"
import MapView from "@/components/dashboard/MapView"
import { ThreatMonitor } from "@/components/ThreatMonitor";
import { GeofenceMap } from "@/components/GeofenceMap";
import { LiveAlerts } from "@/components/LiveAlerts";
import { ActivityLog } from "@/components/ActivityLog";
import { DeviceRegistration } from "@/components/DeviceRegistration";
import { GeofenceEditor } from "@/components/GeofenceEditor";
import { WearableMonitor } from "@/components/WearableMonitor";
import { triggerEmergency } from '../features/wearable/alertService';
import { useEffect, useState } from 'react';
import socket from '../utils/socket';

function Dashboard() {
  const handlePanicClick = async () => {
    const lat = -25.7479;
    const lng = 28.2293;
    await triggerEmergency(lat, lng);
  };

  const [emergencyAlerts, setEmergencyAlerts] = useState([]);

useEffect(() => {
  socket.on('emergency-alert', (data) => {
    console.log('🚨 New Emergency Alert:', data);
    setEmergencyAlerts((prev) => [data, ...prev]);
  });

  return () => {
    socket.off('emergency-alert');
  };
}, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the SafeSphere Dashboard</h1>
      
      {/* 🚨 Panic Button */}
      <button
        onClick={handlePanicClick}
        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4"
      >
        <div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Live Emergency Alerts</h2>
  {emergencyAlerts.length === 0 ? (
    <p className="text-gray-500">No emergencies triggered yet.</p>
  ) : (
    <ul className="space-y-2">
      {emergencyAlerts.map((alert, index) => (
        <li key={index} className="bg-red-100 border border-red-400 p-2 rounded">
          <strong>Emergency at:</strong> {alert.lat}, {alert.lng}  
          <br />
          <span className="text-sm text-gray-600">{new Date(alert.timestamp).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  )}
</div>

        🚨 Trigger Emergency
      </button>
    </div>
  );
}

export default Dashboard;


// Add this after the map and monitor
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <LiveAlerts />
</div>

  <div className="mt-8">
  <GeofenceEditor />
</div>

  <div className="mt-8">
  <WearableMonitor />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <LiveAlerts />
  <ActivityLog />
</div>

  <div className="mt-8">
  <DeviceRegistration />
</div>

{/* Somewhere in your JSX layout */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
  <ThreatMonitor />
  <GeofenceMap />
</div>

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <MapView />
      <AlertList />
    </div>
  )
}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <AlertsPanel />
  <ThreatMonitor /> {/* ← Add here */}
</div>

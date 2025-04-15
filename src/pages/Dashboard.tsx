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

function Dashboard() {
  const handlePanicClick = async () => {
    const lat = -25.7479;
    const lng = 28.2293;
    await triggerEmergency(lat, lng);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the SafeSphere Dashboard</h1>
      
      {/* 🚨 Panic Button */}
      <button
        onClick={handlePanicClick}
        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded mt-4"
      >
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

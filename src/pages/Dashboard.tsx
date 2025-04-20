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
import EmergencyMap from '../components/EmergencyMap';
import { getNearbyPartners } from "../utils/partners";
import { dispatchResponder } from "../utils/dispatch";
import RouteMap from "../components/RouteMap";
import IncidentHistory from '@/components/IncidentHistory';
import ResponderAssignPanel from '@/components/ResponderAssignPanel';
import NotificationToast from '@/components/NotificationToast';
import { useToast } from '@/hooks/useToast';
// src/pages/Dashboard.tsx
import { getUserRole } from '@/utils/auth';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import ResponderDashboard from '@/components/dashboards/ResponderDashboard';
import GuardDashboard from '@/components/dashboards/GuardDashboard';
import { useEffect, useState } from 'react';
import socket from '@/utils/socket';
import { SmartAlertDisplay } from '@/components/alerts/SmartAlertDisplay';

...

<SmartAlertDisplay />

const Dashboard = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [incident, setIncident] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');

    // Common alert handler
    socket.on('alert', (msg: string) => {
      setMessages(prev => [...prev, msg]);
    });

    // Role-specific incidents
    if (role === 'responder') {
      socket.on('incident:responder', (data: string) => {
        setIncident(`🚨 New Incident: ${data}`);
      });
    }

    if (role === 'guard') {
      socket.on('incident:guard', (data: string) => {
        setIncident(`🛡️ Guard Alert: ${data}`);
      });
    }

    if (role === 'admin') {
      socket.on('admin:log', (log: string) => {
        setMessages(prev => [...prev, `📋 Log: ${log}`]);
      });
    }

    return () => {
      socket.off('alert');
      socket.off('incident:responder');
      socket.off('incident:guard');
      socket.off('admin:log');
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard Feed</h2>
      
      {incident && <div className="bg-red-200 p-3 rounded mb-4">{incident}</div>}
      
      <ul className="space-y-2">
        {messages.map((msg, idx) => (
          <li key={idx} className="bg-gray-100 p-2 rounded">{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

const Dashboard = () => {
  const role = getUserRole();

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'responder':
      return <ResponderDashboard />;
    case 'guard':
      return <GuardDashboard />;
    default:
      return <div>Unauthorized</div>;
  }
};

export default Dashboard;


// Inside the return JSX
<EmergencyMap />

function Dashboard() {
  const handlePanicClick = async () => {
    const lat = -25.7479;
    const lng = 28.2293;
    await triggerEmergency(lat, lng);
  };

  const [partners, setPartners] = useState([]);
const [dispatched, setDispatched] = useState<any>(null);
const { message, visible, showToast } = useToast();

useEffect(() => {
  const fetchPartners = async () => {
    const results = await getNearbyPartners(/* Insert lat/lng later */);
    setPartners(results);
  };

  fetchPartners();
}, []);

  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
{visible && <NotificationToast message={message} onClose={() => {}} />}

useEffect(() => {
  socket.on('emergency-alert', (data) => {
    console.log('🚨 New Emergency Alert:', data);
    setEmergencyAlerts((prev) => [data, ...prev]);
  });
const handleDispatch = async (id: string) => {
  const result: any = await dispatchResponder(id);
  setDispatched(result);
};

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
        <div className="mt-6 p-4 bg-white rounded shadow">
  <h3 className="text-lg font-semibold mb-2">Nearby Security Partners</h3>
  <ul className="space-y-2">
    {partners.map((partner) => (
      <li key={partner.id} className="border p-2 rounded">
        <p className="font-medium">{partner.name}</p>
        <p>Distance: {partner.distance}</p>
        <p>ETA: {partner.eta}</p>
<p>Status: <span className="text-green-600">{partner.status}</span></p>
<button
  className="mt-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
  onClick={() => handleDispatch(partner.id)}
>
  Dispatch
</button>
      </li>
    ))}
  </ul>
</div>

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
  {dispatched && (
  <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
    <p>{dispatched.message}</p>
    <p>ETA: {dispatched.eta}</p>
  </div>
)}

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <AlertsPanel />
  <ThreatMonitor /> {/* ← Add here */}
</div>
<IncidentHistory />
<ResponderAssignPanel />

  socket.on('incident:new', (incidentData) => {
  showToast(`New incident detected in ${incidentData.zone}`);
});

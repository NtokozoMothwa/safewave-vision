
import { useEffect, useState } from 'react';
import socket from '@/utils/socket';
import { useToast } from '@/hooks/useToast';
import MapView from '@/components/dashboard/MapView';
import AlertList from '@/components/dashboard/AlertList';
import { getUserRole } from '@/utils/auth';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import ResponderDashboard from '@/components/dashboards/ResponderDashboard';
import GuardDashboard from '@/components/dashboards/GuardDashboard';
// You may need to import NotificationToast if you use it.

const Dashboard = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [incident, setIncident] = useState<string | null>(null);
  const { message, visible, showToast } = useToast();
  const role = getUserRole();

  useEffect(() => {
    socket.on('alert', (msg: string) => {
      setMessages(prev => [...prev, msg]);
    });

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

    socket.on('incident:new', (incidentData) => {
      showToast(`New incident detected in ${incidentData.zone}`);
    });

    return () => {
      socket.off('alert');
      socket.off('incident:responder');
      socket.off('incident:guard');
      socket.off('admin:log');
      socket.off('incident:new');
    };
  }, [role, showToast]);

  // Render the appropriate dashboard based on user role
  const renderDashboardByRole = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'responder':
        return <ResponderDashboard />;
      case 'guard':
        return <GuardDashboard />;
      default:
        return (
          <div className="p-6 space-y-6">
            <MapView />
            <AlertList />
            {incident && <div className="bg-red-200 p-3 rounded mb-4">{incident}</div>}

            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Dashboard Feed</h2>
              <ul className="space-y-2">
                {messages.map((msg, idx) => (
                  <li key={idx} className="bg-gray-100 p-2 rounded">{msg}</li>
                ))}
              </ul>
            </div>

            {/* If NotificationToast is used, uncomment it and make sure it's imported */}
            {/* {visible && <NotificationToast message={message} onClose={() => {}} />} */}
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {renderDashboardByRole()}
    </div>
  );
};

export default Dashboard;

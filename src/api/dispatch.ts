import { dispatchResponders } from '@/lib/dispatchEngine';

type Incident = {
  type: 'Panic' | 'Fall' | 'Anomaly';
  userLocation: { lat: number; lng: number };
};

export async function handleIncident(incident: Incident) {
  const dispatched = dispatchResponders(incident);

  // Later: Integrate real API calls or SMS/email webhooks
  console.log('🚨 Dispatch log:', dispatched);

  return {
    success: true,
    message: 'Responders notified.',
    responders: dispatched,
  };
}

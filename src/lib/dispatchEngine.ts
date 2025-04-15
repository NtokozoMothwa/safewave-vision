type Responder = {
  id: string;
  name: string;
  type: 'Police' | 'Security' | 'Medical';
  location: { lat: number; lng: number };
  contact: string; // Can be email, webhook, or phone
};

type Incident = {
  type: 'Panic' | 'Fall' | 'Anomaly';
  userLocation: { lat: number; lng: number };
};

const responders: Responder[] = [
  {
    id: '1',
    name: 'Alpha Security',
    type: 'Security',
    location: { lat: -25.7461, lng: 28.1881 },
    contact: 'alpha@security.com',
  },
  {
    id: '2',
    name: 'Pretoria Metro Police',
    type: 'Police',
    location: { lat: -25.7500, lng: 28.2000 },
    contact: 'police@pretoria.gov',
  },
];

function getDistance(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const aCalc =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));

  return R * c; // in KM
}

export function dispatchResponders(incident: Incident) {
  const sorted = responders
    .map((r) => ({ ...r, distance: getDistance(incident.userLocation, r.location) }))
    .sort((a, b) => a.distance - b.distance);

  const notified = sorted.slice(0, 2); // Send to nearest 2
  notified.forEach((r) => {
    console.log(
      `📡 Alert sent to ${r.name} (${r.type}) at ${r.contact}. Distance: ${r.distance.toFixed(2)}km`
    );
  });

  return notified;
}

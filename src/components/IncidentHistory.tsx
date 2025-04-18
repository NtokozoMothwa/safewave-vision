import React from 'react';

interface Incident {
  id: string;
  timestamp: string;
  type: string;
  location: string;
  responder?: string;
  status: 'resolved' | 'pending' | 'escalated';
}

const dummyIncidents: Incident[] = [
  {
    id: '1',
    timestamp: '2025-04-12 10:15',
    type: 'Panic Button',
    location: 'Zone A - Campus Entrance',
    responder: 'Unit 45',
    status: 'resolved',
  },
  {
    id: '2',
    timestamp: '2025-04-11 21:07',
    type: 'Fall Detection',
    location: 'Zone C - Student Dorms',
    responder: 'Unit 32',
    status: 'pending',
  },
  {
    id: '3',
    timestamp: '2025-04-10 17:49',
    type: 'Geo-Zone Breach',
    location: 'Zone B - Parking Lot',
    status: 'escalated',
  },
];

const IncidentHistory: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Incident History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Responder</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyIncidents.map((incident) => (
              <tr key={incident.id} className="border-t">
                <td className="px-4 py-2">{incident.timestamp}</td>
                <td className="px-4 py-2">{incident.type}</td>
                <td className="px-4 py-2">{incident.location}</td>
                <td className="px-4 py-2">{incident.responder || '—'}</td>
                <td className="px-4 py-2 capitalize">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      incident.status === 'resolved'
                        ? 'bg-green-100 text-green-700'
                        : incident.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentHistory;

import React, { useState } from 'react';

const responders = ['Unit 45', 'Unit 32', 'Drone A3', 'Medic 19'];
const activeIncidents = [
  { id: '101', type: 'Fall Detection', location: 'Zone C', status: 'unassigned' },
  { id: '102', type: 'Geo-Zone Breach', location: 'Zone A', status: 'unassigned' },
];

const ResponderAssignPanel: React.FC = () => {
  const [assignments, setAssignments] = useState<{ [key: string]: string }>({});

  const handleAssign = (incidentId: string, responder: string) => {
    setAssignments({ ...assignments, [incidentId]: responder });
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Responder Assignment</h2>
      <div className="space-y-4">
        {activeIncidents.map((incident) => (
          <div key={incident.id} className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">
              {incident.type} - {incident.location}
            </div>
            <div className="flex items-center justify-between">
              <span>
                Assigned:{" "}
                {assignments[incident.id] ? (
                  <strong>{assignments[incident.id]}</strong>
                ) : (
                  <em>None</em>
                )}
              </span>
              <select
                className="ml-4 px-2 py-1 rounded border"
                onChange={(e) => handleAssign(incident.id, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Select Responder
                </option>
                {responders.map((responder) => (
                  <option key={responder} value={responder}>
                    {responder}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponderAssignPanel;

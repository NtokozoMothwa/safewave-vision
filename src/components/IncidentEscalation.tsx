import React, { useState, useEffect } from "react";

interface IncidentData {
  timestamp: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  notes: string;
}

const IncidentEscalation = () => {
  const [incident, setIncident] = useState<IncidentData | null>(null);

  useEffect(() => {
    const now = new Date();
    const fakeIncident: IncidentData = {
      timestamp: now.toLocaleString(),
      type: "Panic Alert",
      severity: "High",
      notes: "User triggered panic button. Responder en route.",
    };

    // Simulate delay before escalation
    const timer = setTimeout(() => {
      setIncident(fakeIncident);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-red-900 text-white rounded-xl p-6 shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Incident Escalation Log</h2>
      {incident ? (
        <>
          <p><strong>📅 Time:</strong> {incident.timestamp}</p>
          <p><strong>⚠️ Type:</strong> {incident.type}</p>
          <p><strong>🔥 Severity:</strong> {incident.severity}</p>
          <p><strong>📝 Notes:</strong> {incident.notes}</p>
        </>
      ) : (
        <p>📡 Monitoring for incident escalation...</p>
      )}
    </div>
  );
};

export default IncidentEscalation;

import React from "react";

interface IntelligenceProps {
  lastAlert: string;
  activeThreats: string[];
  zone: string;
  time: string;
  location: string;
}

const IntelligencePanel: React.FC<IntelligenceProps> = ({
  lastAlert,
  activeThreats,
  zone,
  time,
  location,
}) => {
  return (
    <div className="bg-slate-800 text-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Real-Time Intelligence</h2>
      <p><strong>🆘 Last Alert:</strong> {lastAlert}</p>
      <p><strong>📍 Zone:</strong> {zone}</p>
      <p><strong>⏰ Time:</strong> {time}</p>
      <p><strong>📌 Location:</strong> {location}</p>
      <div>
        <strong>⚠️ Active Threats:</strong>
        <ul className="list-disc list-inside ml-4">
          {activeThreats.map((threat, index) => (
            <li key={index}>{threat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IntelligencePanel;

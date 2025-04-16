import React, { useEffect, useState } from "react";

interface Responder {
  name: string;
  type: "Law Enforcement" | "Private Security";
  distance: string;
  eta: string;
  status: "Available" | "En Route" | "Unavailable";
}

const mockResponders: Responder[] = [
  {
    name: "Metro Police Unit 14",
    type: "Law Enforcement",
    distance: "1.2 km",
    eta: "2 mins",
    status: "En Route",
  },
  {
    name: "ShieldForce Security Van",
    type: "Private Security",
    distance: "800m",
    eta: "1 min",
    status: "Available",
  },
];

const ResponderConnect = () => {
  const [nearestResponder, setNearestResponder] = useState<Responder | null>(null);

  useEffect(() => {
    // Simulate logic for choosing nearest available responder
    const available = mockResponders.find((res) => res.status !== "Unavailable");
    setNearestResponder(available || null);
  }, []);

  return (
    <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Responder Connect</h2>
      {nearestResponder ? (
        <>
          <p><strong>👮 Responder:</strong> {nearestResponder.name}</p>
          <p><strong>🚓 Type:</strong> {nearestResponder.type}</p>
          <p><strong>📍 Distance:</strong> {nearestResponder.distance}</p>
          <p><strong>⏱ ETA:</strong> {nearestResponder.eta}</p>
          <p><strong>📡 Status:</strong> {nearestResponder.status}</p>
        </>
      ) : (
        <p>No available responders nearby.</p>
      )}
    </div>
  );
};

export default ResponderConnect;

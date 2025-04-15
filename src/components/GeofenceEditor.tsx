// src/components/GeofenceEditor.tsx
import React, { useState } from "react";
import { MapPin, Save } from "lucide-react";

type Zone = {
  name: string;
  lat: string;
  lng: string;
  radius: string;
};

export const GeofenceEditor = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [form, setForm] = useState<Zone>({
    name: "",
    lat: "",
    lng: "",
    radius: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddZone = () => {
    if (!form.name || !form.lat || !form.lng || !form.radius) return;
    setZones((prev) => [...prev, form]);
    setForm({ name: "", lat: "", lng: "", radius: "" });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border dark:border-zinc-700 mt-10">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
        <MapPin className="text-blue-600" />
        Geofence Zone Editor
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Zone Name"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
        <input
          type="text"
          name="lat"
          value={form.lat}
          onChange={handleChange}
          placeholder="Latitude"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
        <input
          type="text"
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="Longitude"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
        <input
          type="text"
          name="radius"
          value={form.radius}
          onChange={handleChange}
          placeholder="Radius (meters)"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <button
        onClick={handleAddZone}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        <Save size={16} /> Save Zone
      </button>

      <div className="mt-6">
        <h3 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Defined Zones:</h3>
        <ul className="space-y-2 text-sm">
          {zones.map((zone, index) => (
            <li
              key={index}
              className="p-2 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded"
            >
              <strong>{zone.name}</strong>: ({zone.lat}, {zone.lng}) – {zone.radius}m
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

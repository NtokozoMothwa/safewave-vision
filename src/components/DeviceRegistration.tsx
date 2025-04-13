// src/components/DeviceRegistration.tsx
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

type Device = {
  id: string;
  userName: string;
  type: "child" | "elder" | "guard" | "other";
  phone: string;
  zone: string;
};

export const DeviceRegistration = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [form, setForm] = useState<Device>({
    id: "",
    userName: "",
    type: "child",
    phone: "",
    zone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (!form.id || !form.userName) return;
    setDevices((prev) => [...prev, form]);
    setForm({
      id: "",
      userName: "",
      type: "child",
      phone: "",
      zone: "",
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg border dark:border-zinc-700">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
        <PlusCircle className="text-green-500" />
        Register New Device
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="Device ID"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
        <input
          type="text"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          placeholder="User Name"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="child">Child</option>
          <option value="elder">Elder</option>
          <option value="guard">Guard</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Emergency Contact"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
        <input
          type="text"
          name="zone"
          value={form.zone}
          onChange={handleChange}
          placeholder="Assigned Zone"
          className="p-2 rounded border dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <button
        onClick={handleRegister}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Register Device
      </button>

      <div className="mt-6">
        <h3 className="font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Registered Devices:</h3>
        <ul className="space-y-2 text-sm">
          {devices.map((device) => (
            <li
              key={device.id}
              className="p-2 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded"
            >
              <strong>{device.userName}</strong> ({device.type}) — Zone: {device.zone}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

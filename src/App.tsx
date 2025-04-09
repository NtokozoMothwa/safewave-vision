import React from "react";
import LiveAlert from "./components/LiveAlert";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <LiveAlert />
      <main className="p-4">
        <h1 className="text-2xl font-bold">SafeWave Vision</h1>
        <p className="mt-2">Welcome to SGX's safety platform 🚨</p>
      </main>
    </div>
  );
}

export default App;

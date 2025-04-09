import AlertFeed from "./components/AlertFeed";
import React from "react";
import TriggerAlertPanel from "./components/TriggerAlertPanel";
import LiveAlert from "./components/LiveAlert";
<AlertFeed />
<TriggerAlertPanel />
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

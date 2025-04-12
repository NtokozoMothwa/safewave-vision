import React from "react";
import { AlertProvider } from "./context/AlertContext";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
// import other components or pages as you create them

function App() {
  return (
    <AlertProvider>
      <div className="min-h-screen bg-white text-black">
        <Navbar />
        <main className="p-4">
          <Dashboard />
        </main>
      </div>
    </AlertProvider>
  );
}

export default App;

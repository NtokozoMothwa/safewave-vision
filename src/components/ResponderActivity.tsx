import React, { useEffect, useState } from "react";

const responderPath = ["Dispatched", "En Route", "Near Scene", "On Scene", "Resolved"];

const ResponderActivity = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep < responderPath.length - 1 ? prevStep + 1 : prevStep));
    }, 3000); // simulate updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-indigo-800 text-white rounded-xl p-6 mt-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">🚓 Responder Activity</h2>
      <ul className="space-y-2">
        {responderPath.map((step, index) => (
          <li key={step} className={`transition-all duration-300 ${index === currentStep ? "text-yellow-400 font-semibold" : "text-gray-300"}`}>
            {index <= currentStep ? "✅" : "⏳"} {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponderActivity;

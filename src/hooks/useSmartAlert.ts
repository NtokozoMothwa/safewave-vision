
// src/hooks/useSmartAlert.ts
import { useCallback } from 'react';
import { AlertData } from '../utils/alertRules';
import { processAlert } from '../services/AlertEngine';

export const useSmartAlert = () => {
  const triggerSmartAlert = useCallback((data: AlertData) => {
    processAlert(data);
    
    // Example of adding an alert to some state
    const addAlert = (alertData: {
      id: string;
      type: string;
      message: string;
      timestamp: number;
      latitude: number;
      longitude: number;
    }) => {
      console.log('Alert added:', alertData);
      // Implementation would go here
    };
    
    // Example usage of addAlert
    addAlert({
      id: 'some-id',
      type: 'warning',
      message: 'Alert message',
      timestamp: Date.now(),
      latitude: -25.7461, // Example coords (Pretoria)
      longitude: 28.1881,
    });
  }, []);

  return { triggerSmartAlert };
};

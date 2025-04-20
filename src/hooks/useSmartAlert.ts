// src/hooks/useSmartAlert.ts
import { useCallback } from 'react';
import { AlertData } from '../utils/alertRules';
import { processAlert } from '../services/AlertEngine';

// export const useSmartAlert = () => {
//  const triggerSmartAlert = useCallback((data: AlertData) => {
//    processAlert(data);
//  }, []);

addAlert({
  id,
  type,
  message,
  timestamp: Date.now(),
  latitude: -25.7461, // Example coords (Pretoria)
  longitude: 28.1881,
});

  return { triggerSmartAlert };
};

// src/hooks/useSmartAlert.ts
import { useCallback } from 'react';
import { AlertData } from '../utils/alertRules';
import { processAlert } from '../services/AlertEngine';

export const useSmartAlert = () => {
  const triggerSmartAlert = useCallback((data: AlertData) => {
    processAlert(data);
  }, []);

  return { triggerSmartAlert };
};

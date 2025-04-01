
import { useState } from 'react';
import { makeAuthRequest } from './useApiUtils';
import { smartwatchApi, SmartWatchData, SmartWatchCommand } from '@/services/smartwatchApi';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export function useSmartWatch() {
  const { user } = useAuth();
  const [deviceId, setDeviceId] = useState<string | null>(
    localStorage.getItem('safesphere_device_id')
  );
  
  // Get list of compatible devices
  const { data: compatibleDevices, isLoading: devicesLoading } = useQuery({
    queryKey: ['smartwatch', 'compatible-devices'],
    queryFn: async () => {
      const response = await smartwatchApi.getCompatibleDevices();
      return response.data || [];
    }
  });
  
  // Register a new device
  const registerDevice = async (deviceData: SmartWatchData) => {
    const response = await makeAuthRequest(
      '/smartwatch/register', 
      'POST',
      () => smartwatchApi.registerDevice(deviceData)
    );
    
    if (response.success && response.data?.deviceId) {
      // Store device ID for future use
      setDeviceId(response.data.deviceId);
      localStorage.setItem('safesphere_device_id', response.data.deviceId);
      return response.data.deviceId;
    }
    
    return null;
  };
  
  // Send a command to the device
  const sendCommand = async (command: SmartWatchCommand) => {
    if (!deviceId) return { success: false, error: { code: 'no_device', message: 'No device registered' } };
    
    return await makeAuthRequest(
      `/smartwatch/${deviceId}/command`,
      'POST',
      () => smartwatchApi.sendCommand(deviceId, command)
    );
  };
  
  // Sync data from the device
  const syncData = async (data: Partial<SmartWatchData>) => {
    if (!deviceId) return { success: false, error: { code: 'no_device', message: 'No device registered' } };
    
    return await makeAuthRequest(
      `/smartwatch/${deviceId}/sync`,
      'POST',
      () => smartwatchApi.syncData(deviceId, data)
    );
  };
  
  return {
    deviceId,
    compatibleDevices,
    devicesLoading,
    registerDevice,
    sendCommand,
    syncData,
    hasDevice: !!deviceId
  };
}

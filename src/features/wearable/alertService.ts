// src/features/wearable/alertService.ts

import { handleIncident } from '@/api/dispatch';

export async function triggerEmergency(lat: number, lng: number) {
  console.log('🚨 Triggering emergency dispatch...');

  await handleIncident({
    type: 'Panic',
    userLocation: { lat, lng },
  });
}

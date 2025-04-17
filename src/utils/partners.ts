// src/utils/partners.ts
export const getNearbyPartners = async (lat: number, lng: number) => {
  // Placeholder for real-time lookup
  return [
    {
      id: 'alpha-secure',
      name: 'Alpha Secure',
      distance: '1.2 km',
      eta: '4 min',
      status: 'Available',
    },
    {
      id: 'beta-response',
      name: 'Beta Response',
      distance: '2.5 km',
      eta: '8 min',
      status: 'On Duty',
    },
  ];
};

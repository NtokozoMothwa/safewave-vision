export type GeoZone = {
  id: string;
  name: string;
  type: 'safe' | 'danger';
  center: [number, number];
  radius: number; // in meters
};

export const defaultZones: GeoZone[] = [
  {
    id: 'zone-1',
    name: 'Safe Zone - HQ',
    type: 'safe',
    center: [-25.7461, 28.1881],
    radius: 1000,
  },
  {
    id: 'zone-2',
    name: 'High Risk Area',
    type: 'danger',
    center: [-25.7400, 28.2000],
    radius: 700,
  },
];

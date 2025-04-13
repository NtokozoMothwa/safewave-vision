import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useState } from "react"
import { useSocketStore } from "@/store/socketStore"

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

type LocationData = {
  id: number
  lat: number
  lng: number
  user: string
  timestamp: string
}

const geoFenceZone = {
  center: [-25.7461, 28.1881], // Pretoria
  radius: 1000, // meters
}

export default function MapView() {
  const socket = useSocketStore((state) => state.socket)
  const [locations, setLocations] = useState<LocationData[]>([])
  const [routes, setRoutes] = useState<{ [key: number]: [number, number][] }>({})

  useEffect(() => {
    if (!socket) return

    socket.on("location-update", (data: LocationData) => {
      setLocations((prev) => {
        const updated = [...prev.filter((loc) => loc.id !== data.id), data]
        // Update route trail
        setRoutes((r) => ({
          ...r,
          [data.id]: [...(r[data.id] || []), [data.lat, data.lng]],
        }))
        return updated
      })
    })

    return () => {
      socket.off("location-update")
    }
  }, [socket])

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">📍 Real-Time Location Map</h2>
      <MapContainer center={geoFenceZone.center} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={geoFenceZone.center}
          radius={geoFenceZone.radius}
          pathOptions={{ fillColor: "red", color: "red", fillOpacity: 0.2 }}
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={markerIcon}>
            <Popup>
              <strong>{loc.user}</strong>
              <br />
              {new Date(loc.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
        {Object.entries(routes).map(([id, route]) => (
          <Polyline key={id} positions={route} color="blue" />
        ))}
      </MapContainer>
    </div>
  )
}

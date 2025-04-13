import AlertList from "@/components/dashboard/AlertList"
import MapView from "@/components/dashboard/MapView"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <MapView />
      <AlertList />
    </div>
  )
}

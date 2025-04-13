import AlertList from "@/components/dashboard/AlertList"
import MapView from "@/components/dashboard/MapView"
import { ThreatMonitor } from "@/components/ThreatMonitor";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <MapView />
      <AlertList />
    </div>
  )
}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <AlertsPanel />
  <ThreatMonitor /> {/* ← Add here */}
</div>

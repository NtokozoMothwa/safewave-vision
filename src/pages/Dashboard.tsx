import AlertList from "@/components/dashboard/AlertList"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Add this line 👇 */}
      <AlertList />
    </div>
  )
}

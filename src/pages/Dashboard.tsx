import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import AlertFeed from "@/components/AlertFeed"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background text-foreground">
      <Navbar />
      <main className="p-6 md:p-10 space-y-6 max-w-5xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button variant="default" size="sm">
            + New Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">14</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 dark:text-green-400 font-semibold">
                All Systems Operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Real-Time Alerts */}
        <AlertFeed />
      </main>
    </div>
  )
}

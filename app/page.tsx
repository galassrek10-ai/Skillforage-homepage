import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

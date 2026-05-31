"use client"

import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Target,
  Package,
  Sparkles,
  Settings,
  LineChart,
} from "lucide-react"

const nav = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: TrendingUp, label: "Revenue", active: false },
  { icon: Users, label: "Leads", active: false },
  { icon: Target, label: "Pipeline", active: false },
  { icon: Package, label: "Products", active: false },
  { icon: Sparkles, label: "AI Insights", active: false },
]

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card/40 lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LineChart className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">LocalBiz</p>
          <p className="text-xs text-muted-foreground">Sales Genius</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        <p className="px-3 pb-2 pt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                item.active
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </a>
        <div className="mt-2 flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
            AR
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium">Alex Rivera</p>
            <p className="text-xs text-muted-foreground">Riverside Auto Spa</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

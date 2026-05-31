"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Download, Menu, Search } from "lucide-react"
import { kpisByRange, revenueByRange, ranges, type RangeKey } from "@/lib/data"
import { KpiCards } from "@/components/kpi-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { LeadChannels } from "@/components/lead-channels"
import { ConversionFunnel } from "@/components/conversion-funnel"
import { TopProducts } from "@/components/top-products"
import { SalesReps } from "@/components/sales-reps"
import { AiInsights } from "@/components/ai-insights"

export function Dashboard() {
  const [range, setRange] = useState<RangeKey>("30d")
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
        <button
          className="rounded-md p-2 text-muted-foreground hover:bg-secondary lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base font-semibold leading-tight md:text-lg">Overview</h1>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Your sales performance at a glance
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-44 rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          {/* Range selector */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium hover:bg-secondary"
            >
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {ranges.find((r) => r.key === range)?.label}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {open && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-md border border-border bg-popover py-1 shadow-lg">
                  {ranges.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => {
                        setRange(r.key)
                        setOpen(false)
                      }}
                      className={`flex w-full items-center px-3 py-2 text-left text-sm hover:bg-secondary ${
                        r.key === range ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button className="flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <KpiCards kpis={kpisByRange[range]} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <RevenueChart data={revenueByRange[range]} />
          <LeadChannels />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TopProducts />
          <SalesReps />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ConversionFunnel />
          <AiInsights />
        </div>
      </main>
    </div>
  )
}

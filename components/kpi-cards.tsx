"use client"

import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import type { Kpi } from "@/lib/data"

export function KpiCards({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const up = kpi.delta >= 0
        return (
          <div
            key={kpi.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                  up
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {up ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(kpi.delta)}%
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{kpi.value}</p>
            <div className="mt-3 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpi.spark}>
                  <defs>
                    <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={up ? "var(--chart-1)" : "var(--chart-4)"}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor={up ? "var(--chart-1)" : "var(--chart-4)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={up ? "var(--chart-1)" : "var(--chart-4)"}
                    strokeWidth={2}
                    fill={`url(#spark-${kpi.id})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      })}
    </div>
  )
}

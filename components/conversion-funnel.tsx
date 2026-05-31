"use client"

import { funnel } from "@/lib/data"

export function ConversionFunnel() {
  const max = funnel[0].value
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">Sales Pipeline</h3>
      <p className="text-xs text-muted-foreground">Lead-to-close conversion stages</p>

      <div className="mt-5 flex flex-col gap-3">
        {funnel.map((stage, i) => {
          const pct = Math.round((stage.value / max) * 100)
          const isWon = stage.stage === "Closed Won"
          return (
            <div key={stage.stage}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{stage.stage}</span>
                <span className="font-medium tabular-nums">
                  {stage.value.toLocaleString()}
                  <span className="ml-2 text-xs text-muted-foreground">{pct}%</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: isWon ? "var(--chart-1)" : "var(--chart-2)",
                    opacity: isWon ? 1 : 0.45 + (funnel.length - i) * 0.1,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

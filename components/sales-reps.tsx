"use client"

import { reps } from "@/lib/data"

export function SalesReps() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">Team Leaderboard</h3>
      <p className="text-xs text-muted-foreground">Quota attainment by rep</p>

      <div className="mt-4 flex flex-col gap-4">
        {reps.map((rep) => (
          <div key={rep.name} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
              {rep.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="truncate text-sm font-medium">{rep.name}</p>
                <p className="text-sm font-medium tabular-nums">{rep.revenue}</p>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.min(100, rep.quota)}%` }}
                  />
                </div>
                <span className="w-10 text-right text-xs text-muted-foreground tabular-nums">
                  {rep.quota}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

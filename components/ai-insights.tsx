"use client"

import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import { insights } from "@/lib/data"

const toneMap = {
  positive: { icon: TrendingUp, className: "text-primary" },
  warning: { icon: AlertTriangle, className: "text-[var(--chart-3)]" },
  info: { icon: Lightbulb, className: "text-[var(--chart-2)]" },
} as const

export function AiInsights() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">AI Insights</h3>
        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          Genius
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {insights.map((insight) => {
          const { icon: Icon, className } = toneMap[insight.tone]
          return (
            <div
              key={insight.id}
              className="rounded-lg border border-border bg-background/40 p-4"
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${className}`} />
                <p className="text-sm font-medium">{insight.title}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {insight.body}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

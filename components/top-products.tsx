"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { topProducts } from "@/lib/data"

export function TopProducts() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Top Products & Services</h3>
          <p className="text-xs text-muted-foreground">Best performers this period</p>
        </div>
        <a href="#" className="text-xs font-medium text-primary hover:underline">
          View all
        </a>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium">Category</th>
              <th className="pb-2 text-right font-medium">Units</th>
              <th className="pb-2 text-right font-medium">Revenue</th>
              <th className="pb-2 text-right font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => {
              const up = p.trend >= 0
              return (
                <tr key={p.name} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 text-right tabular-nums">{p.units}</td>
                  <td className="py-3 text-right font-medium tabular-nums">{p.revenue}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                        up ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {up ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(p.trend)}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

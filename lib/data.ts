export type RangeKey = "7d" | "30d" | "90d"

export const ranges: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
]

export type Kpi = {
  id: string
  label: string
  value: string
  delta: number
  spark: { v: number }[]
}

function spark(seed: number, points = 16): { v: number }[] {
  const out: { v: number }[] = []
  let v = seed
  for (let i = 0; i < points; i++) {
    v += Math.round(Math.sin(i * 1.3 + seed) * (seed * 0.06) + (i % 3) * 4)
    out.push({ v: Math.max(2, v) })
  }
  return out
}

export const kpisByRange: Record<RangeKey, Kpi[]> = {
  "7d": [
    { id: "revenue", label: "Revenue", value: "$48,290", delta: 12.4, spark: spark(120) },
    { id: "leads", label: "New Leads", value: "312", delta: 8.1, spark: spark(60) },
    { id: "conversion", label: "Conversion Rate", value: "21.6%", delta: 3.2, spark: spark(40) },
    { id: "deal", label: "Avg. Deal Size", value: "$1,204", delta: -1.8, spark: spark(80) },
  ],
  "30d": [
    { id: "revenue", label: "Revenue", value: "$214,860", delta: 18.7, spark: spark(140) },
    { id: "leads", label: "New Leads", value: "1,408", delta: 11.3, spark: spark(70) },
    { id: "conversion", label: "Conversion Rate", value: "23.9%", delta: 4.6, spark: spark(45) },
    { id: "deal", label: "Avg. Deal Size", value: "$1,322", delta: 2.4, spark: spark(85) },
  ],
  "90d": [
    { id: "revenue", label: "Revenue", value: "$612,140", delta: 22.1, spark: spark(150) },
    { id: "leads", label: "New Leads", value: "4,265", delta: 9.8, spark: spark(75) },
    { id: "conversion", label: "Conversion Rate", value: "22.4%", delta: -0.9, spark: spark(42) },
    { id: "deal", label: "Avg. Deal Size", value: "$1,289", delta: 5.7, spark: spark(82) },
  ],
}

export type RevenuePoint = { label: string; revenue: number; target: number }

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const revenueByRange: Record<RangeKey, RevenuePoint[]> = {
  "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, i) => ({
    label,
    revenue: 4200 + Math.round(Math.sin(i) * 1400) + i * 380,
    target: 5200,
  })),
  "30d": Array.from({ length: 12 }, (_, i) => ({
    label: `W${Math.floor(i / 3) + 1}.${(i % 3) + 1}`,
    revenue: 12000 + Math.round(Math.sin(i * 0.7) * 4200) + i * 520,
    target: 16000,
  })),
  "90d": months.slice(0, 6).map((label, i) => ({
    label,
    revenue: 78000 + Math.round(Math.sin(i) * 14000) + i * 6400,
    target: 95000,
  })),
}

export type ChannelPoint = { channel: string; leads: number }

export const leadChannels: ChannelPoint[] = [
  { channel: "Google", leads: 486 },
  { channel: "Referral", leads: 372 },
  { channel: "Walk-in", leads: 254 },
  { channel: "Social", leads: 198 },
  { channel: "Email", leads: 143 },
]

export type FunnelStage = { stage: string; value: number }

export const funnel: FunnelStage[] = [
  { stage: "Leads", value: 1408 },
  { stage: "Qualified", value: 892 },
  { stage: "Quoted", value: 514 },
  { stage: "Negotiation", value: 318 },
  { stage: "Closed Won", value: 337 },
]

export type Product = {
  name: string
  category: string
  units: number
  revenue: string
  trend: number
}

export const topProducts: Product[] = [
  { name: "Premium Detailing Package", category: "Service", units: 184, revenue: "$42,320", trend: 14 },
  { name: "Annual Maintenance Plan", category: "Subscription", units: 142, revenue: "$38,900", trend: 9 },
  { name: "Express Tune-Up", category: "Service", units: 318, revenue: "$28,620", trend: -3 },
  { name: "Tire & Alignment Bundle", category: "Bundle", units: 96, revenue: "$21,440", trend: 22 },
  { name: "Ceramic Coating Add-on", category: "Add-on", units: 73, revenue: "$18,250", trend: 31 },
]

export type Rep = {
  name: string
  initials: string
  deals: number
  revenue: string
  quota: number
}

export const reps: Rep[] = [
  { name: "Maria Sanchez", initials: "MS", deals: 48, revenue: "$92,400", quota: 112 },
  { name: "James Okafor", initials: "JO", deals: 41, revenue: "$81,200", quota: 98 },
  { name: "Priya Nair", initials: "PN", deals: 37, revenue: "$74,800", quota: 89 },
  { name: "Derek Lawson", initials: "DL", deals: 29, revenue: "$58,100", quota: 71 },
]

export type Insight = {
  id: string
  tone: "positive" | "warning" | "info"
  title: string
  body: string
}

export const insights: Insight[] = [
  {
    id: "1",
    tone: "positive",
    title: "Ceramic Coating is your fastest grower",
    body: "Up 31% this period. Bundling it with Premium Detailing could add an estimated $6,800 in monthly revenue.",
  },
  {
    id: "2",
    tone: "warning",
    title: "Weekend conversion is slipping",
    body: "Saturday close rate dropped to 16%. Consider staffing an extra rep during the 11am–2pm rush.",
  },
  {
    id: "3",
    tone: "info",
    title: "Referrals convert 2.3x better",
    body: "Referral leads close at 39% vs. 17% average. A simple referral incentive could lift overall revenue.",
  },
]

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Value Prop", sent: 1200, opened: 480, replied: 96 },
  { name: "Rival Gap", sent: 980, opened: 392, replied: 78 },
  { name: "Social Proof", sent: 850, opened: 340, replied: 68 },
  { name: "Case Study", sent: 720, opened: 288, replied: 58 },
  { name: "Follow-up", sent: 650, opened: 260, replied: 52 },
];

export function CampaignPerformance() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
          <p className="text-sm text-muted-foreground mt-1">Engagement by message type</p>
        </div>
        <select className="input-field w-auto text-sm py-2 px-3">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap={12}>
            <XAxis 
              type="number" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              width={80}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="sent" name="Sent" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
            <Bar dataKey="opened" name="Opened" fill="hsl(210 100% 55%)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="replied" name="Replied" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <span className="text-xs text-muted-foreground">Sent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'hsl(210 100% 55%)' }} />
          <span className="text-xs text-muted-foreground">Opened</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Replied</span>
        </div>
      </div>
    </div>
  );
}

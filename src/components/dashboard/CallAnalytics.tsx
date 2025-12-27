import { Phone, PhoneIncoming, PhoneOutgoing, Clock, CheckCircle, XCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const callVolumeData = [
  { day: "Mon", inbound: 12, outbound: 18 },
  { day: "Tue", inbound: 15, outbound: 22 },
  { day: "Wed", inbound: 8, outbound: 14 },
  { day: "Thu", inbound: 20, outbound: 25 },
  { day: "Fri", inbound: 16, outbound: 19 },
  { day: "Sat", inbound: 4, outbound: 6 },
  { day: "Sun", inbound: 2, outbound: 3 },
];

const outcomeData = [
  { name: "Confirmed", value: 45, color: "hsl(var(--success))" },
  { name: "Rescheduled", value: 18, color: "hsl(var(--primary))" },
  { name: "Declined", value: 8, color: "hsl(var(--destructive))" },
  { name: "Escalated", value: 6, color: "hsl(var(--warning))" },
];

const confidenceData = [
  { range: "90-100%", count: 34 },
  { range: "80-89%", count: 22 },
  { range: "70-79%", count: 12 },
  { range: "<70%", count: 9 },
];

const dailySuccessRate = [
  { day: "Mon", rate: 78 },
  { day: "Tue", rate: 82 },
  { day: "Wed", rate: 75 },
  { day: "Thu", rate: 88 },
  { day: "Fri", rate: 85 },
  { day: "Sat", rate: 90 },
  { day: "Sun", rate: 92 },
];

export function CallAnalytics() {
  return (
    <div className="space-y-6">
      {/* Call Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">77</p>
              <p className="text-xs text-muted-foreground">Total Calls</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">45</p>
              <p className="text-xs text-muted-foreground">Confirmed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-xs text-muted-foreground">Escalated</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-xs text-muted-foreground">Declined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Call Volume</h3>
              <p className="text-sm text-muted-foreground">Inbound vs Outbound this week</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <PhoneIncoming className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Inbound</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneOutgoing className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Outbound</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="inbound" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outbound" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Call Outcomes Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Call Outcomes</h3>
            <p className="text-sm text-muted-foreground">Distribution by result type</p>
          </div>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={outcomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {outcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {outcomeData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Distribution */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">AI Confidence Distribution</h3>
            <p className="text-sm text-muted-foreground">Classifier confidence scores</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={confidenceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="range" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={70} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate Trend */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Success Rate Trend</h3>
              <p className="text-sm text-muted-foreground">Daily call success rate %</p>
            </div>
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+5.2%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={dailySuccessRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`${value}%`, "Success Rate"]}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

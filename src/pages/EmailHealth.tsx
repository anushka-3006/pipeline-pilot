import { useState } from "react";
import { Shield, CheckCircle, AlertCircle, XCircle, Mail, TrendingUp, Settings, RefreshCw, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const domains = [
  {
    id: "1",
    domain: "acmecorp.com",
    status: "healthy",
    warmupStatus: "active",
    warmupProgress: 78,
    spf: "pass",
    dkim: "pass",
    dmarc: "pass",
    dailySent: 145,
    dailyLimit: 200,
    reputation: 95,
  },
  {
    id: "2",
    domain: "sales.acmecorp.com",
    status: "warning",
    warmupStatus: "active",
    warmupProgress: 45,
    spf: "pass",
    dkim: "pass",
    dmarc: "fail",
    dailySent: 67,
    dailyLimit: 100,
    reputation: 72,
  },
  {
    id: "3",
    domain: "outreach.acmecorp.com",
    status: "healthy",
    warmupStatus: "completed",
    warmupProgress: 100,
    spf: "pass",
    dkim: "pass",
    dmarc: "pass",
    dailySent: 189,
    dailyLimit: 250,
    reputation: 92,
  },
];

const statusStyles = {
  healthy: { color: "text-success", bg: "bg-success/20", icon: CheckCircle },
  warning: { color: "text-warning", bg: "bg-warning/20", icon: AlertCircle },
  critical: { color: "text-destructive", bg: "bg-destructive/20", icon: XCircle },
};

const warmupStyles = {
  active: "bg-primary/20 text-primary",
  completed: "bg-success/20 text-success",
  paused: "bg-muted text-muted-foreground",
};

export default function EmailHealth() {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email Health</h1>
          <p className="text-muted-foreground mt-1">Monitor domain reputation and warm-up status</p>
        </div>
        <button className="btn-secondary">
          <RefreshCw className="w-4 h-4" />
          Check DNS
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Health</p>
              <p className="text-2xl font-bold text-foreground">Excellent</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Emails Today</p>
              <p className="text-2xl font-bold text-foreground">401 / 550</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
              <p className="text-2xl font-bold text-foreground">42.3%</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issues</p>
              <p className="text-2xl font-bold text-foreground">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Connected Domains</h2>
          <div className="space-y-4">
            {domains.map((domain, index) => {
              const StatusIcon = statusStyles[domain.status as keyof typeof statusStyles].icon;
              return (
                <div
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain)}
                  className={cn(
                    "bg-card rounded-xl border p-5 cursor-pointer transition-all animate-slide-in-bottom",
                    selectedDomain.id === domain.id
                      ? "border-primary shadow-glow"
                      : "border-border hover:border-primary/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        statusStyles[domain.status as keyof typeof statusStyles].bg
                      )}>
                        <StatusIcon className={cn(
                          "w-5 h-5",
                          statusStyles[domain.status as keyof typeof statusStyles].color
                        )} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{domain.domain}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide",
                            warmupStyles[domain.warmupStatus as keyof typeof warmupStyles]
                          )}>
                            Warm-up: {domain.warmupStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{domain.reputation}%</p>
                      <p className="text-xs text-muted-foreground">Reputation</p>
                    </div>
                  </div>

                  {/* DNS Status */}
                  <div className="flex items-center gap-4 mb-4">
                    {["SPF", "DKIM", "DMARC"].map((record, i) => {
                      const key = record.toLowerCase() as "spf" | "dkim" | "dmarc";
                      const passed = domain[key] === "pass";
                      return (
                        <div key={record} className="flex items-center gap-2">
                          {passed ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <XCircle className="w-4 h-4 text-destructive" />
                          )}
                          <span className="text-sm text-muted-foreground">{record}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Daily sending ({domain.dailySent}/{domain.dailyLimit})</span>
                      <span className="text-xs text-muted-foreground">{Math.round((domain.dailySent / domain.dailyLimit) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(domain.dailySent / domain.dailyLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Domain Detail */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
          <div className="bg-card rounded-xl border border-border p-5 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">{selectedDomain.domain}</h3>
              
              {/* Warm-up Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Warm-up enabled</span>
                  <button className="w-10 h-6 rounded-full bg-primary relative transition-colors">
                    <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground transition-transform" />
                  </button>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Daily warm-up emails</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      defaultValue="25"
                      className="flex-1 accent-primary"
                    />
                    <span className="text-sm font-medium text-foreground w-8">25</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Reply rate target</label>
                  <select className="input-field text-sm">
                    <option>30%</option>
                    <option>40%</option>
                    <option>50%</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">DNS Records</h4>
              <div className="space-y-3">
                {["SPF", "DKIM", "DMARC"].map((record) => {
                  const key = record.toLowerCase() as "spf" | "dkim" | "dmarc";
                  const passed = selectedDomain[key] === "pass";
                  return (
                    <div key={record} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {passed ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                        <span className="text-sm font-medium text-foreground">{record}</span>
                      </div>
                      <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                        {passed ? "View" : "Setup Guide"}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <button className="w-full btn-secondary">
              <Settings className="w-4 h-4" />
              Advanced Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

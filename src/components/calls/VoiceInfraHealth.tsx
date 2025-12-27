import { useState, useEffect } from "react";
import { 
  Activity, Server, Wifi, Phone, Mic, Volume2, 
  CheckCircle, AlertTriangle, XCircle, RefreshCw,
  Zap, Clock, TrendingUp, Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency: number;
  uptime: number;
  lastCheck: string;
  details?: string;
}

interface InfraMetrics {
  totalCalls24h: number;
  avgLatency: number;
  successRate: number;
  asrAccuracy: number;
  ttsLatency: number;
  sipHealth: number;
}

const mockServices: ServiceStatus[] = [
  {
    name: "Twilio Voice Gateway",
    status: "operational",
    latency: 45,
    uptime: 99.98,
    lastCheck: "2 min ago",
    details: "All regions operational",
  },
  {
    name: "SIP Trunk (Primary)",
    status: "operational",
    latency: 28,
    uptime: 99.95,
    lastCheck: "1 min ago",
    details: "Connected to primary datacenter",
  },
  {
    name: "ASR Engine (Deepgram)",
    status: "operational",
    latency: 120,
    uptime: 99.92,
    lastCheck: "3 min ago",
    details: "Streaming transcription active",
  },
  {
    name: "TTS Engine",
    status: "degraded",
    latency: 350,
    uptime: 99.45,
    lastCheck: "1 min ago",
    details: "Higher than normal latency",
  },
  {
    name: "Call Session Manager",
    status: "operational",
    latency: 15,
    uptime: 99.99,
    lastCheck: "30 sec ago",
  },
  {
    name: "Policy Engine",
    status: "operational",
    latency: 8,
    uptime: 100,
    lastCheck: "1 min ago",
  },
];

const mockMetrics: InfraMetrics = {
  totalCalls24h: 1247,
  avgLatency: 156,
  successRate: 98.4,
  asrAccuracy: 94.2,
  ttsLatency: 245,
  sipHealth: 99.8,
};

const StatusIcon = ({ status }: { status: ServiceStatus["status"] }) => {
  switch (status) {
    case "operational":
      return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    case "degraded":
      return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    case "outage":
      return <XCircle className="w-4 h-4 text-destructive" />;
  }
};

const StatusBadge = ({ status }: { status: ServiceStatus["status"] }) => {
  const styles = {
    operational: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    degraded: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    outage: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <Badge className={cn("border", styles[status])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export function VoiceInfraHealth() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [services, setServices] = useState<ServiceStatus[]>(mockServices);
  const [metrics, setMetrics] = useState<InfraMetrics>(mockMetrics);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const overallHealth = services.every(s => s.status === "operational") 
    ? "operational" 
    : services.some(s => s.status === "outage") 
      ? "outage" 
      : "degraded";

  const operationalCount = services.filter(s => s.status === "operational").length;

  return (
    <div className="space-y-6">
      {/* Overall Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            overallHealth === "operational" ? "bg-emerald-500/20" :
            overallHealth === "degraded" ? "bg-amber-500/20" : "bg-destructive/20"
          )}>
            <Activity className={cn(
              "w-6 h-6",
              overallHealth === "operational" ? "text-emerald-400" :
              overallHealth === "degraded" ? "text-amber-400" : "text-destructive"
            )} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">Voice Infrastructure</h2>
              <StatusBadge status={overallHealth} />
            </div>
            <p className="text-sm text-muted-foreground">
              {operationalCount}/{services.length} services operational
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{metrics.totalCalls24h.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Calls (24h)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{metrics.successRate}%</p>
                <p className="text-xs text-muted-foreground">Success Rate</p>
              </div>
            </div>
            <Progress value={metrics.successRate} className="h-1.5" />
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{metrics.avgLatency}ms</p>
                <p className="text-xs text-muted-foreground">Avg Latency</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Target: &lt;200ms</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Health Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.name} className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusIcon status={service.status} />
                  <span className="font-medium text-foreground">{service.name}</span>
                </div>
                <StatusBadge status={service.status} />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Latency</p>
                  <p className={cn(
                    "font-medium",
                    service.latency < 100 ? "text-emerald-400" :
                    service.latency < 300 ? "text-amber-400" : "text-destructive"
                  )}>
                    {service.latency}ms
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Uptime</p>
                  <p className="font-medium text-foreground">{service.uptime}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Last Check</p>
                  <p className="font-medium text-foreground">{service.lastCheck}</p>
                </div>
              </div>

              {service.details && (
                <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                  {service.details}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Component Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mic className="w-4 h-4 text-primary" />
              ASR Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy</span>
                <span className="font-medium text-foreground">{metrics.asrAccuracy}%</span>
              </div>
              <Progress value={metrics.asrAccuracy} className="h-2" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="w-3 h-3" />
                <span>Streaming mode active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              TTS Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Latency</span>
                <span className={cn(
                  "font-medium",
                  metrics.ttsLatency < 200 ? "text-emerald-400" :
                  metrics.ttsLatency < 400 ? "text-amber-400" : "text-destructive"
                )}>
                  {metrics.ttsLatency}ms
                </span>
              </div>
              <Progress 
                value={100 - (metrics.ttsLatency / 5)} 
                className="h-2" 
              />
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <AlertTriangle className="w-3 h-3" />
                <span>Above target threshold</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" />
              SIP Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connection</span>
                <span className="font-medium text-emerald-400">{metrics.sipHealth}%</span>
              </div>
              <Progress value={metrics.sipHealth} className="h-2" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3 h-3" />
                <span>Primary trunk active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

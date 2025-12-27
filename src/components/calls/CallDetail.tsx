import { useState } from "react";
import { 
  Phone, PhoneIncoming, PhoneOutgoing, Clock, Calendar, User, 
  Play, Pause, Volume2, Download, FileText, ChevronDown, ChevronUp,
  CheckCircle, XCircle, AlertCircle, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Call } from "./CallCard";

interface CallDetailProps {
  call: Call;
}

const mockTranscript = [
  { role: "agent", text: "Hello, this is a reminder call from Autonyze regarding your appointment scheduled for tomorrow at 2 PM. Is this a good time to confirm?", timestamp: "0:00" },
  { role: "lead", text: "Yes, hi. Let me check my calendar.", timestamp: "0:08" },
  { role: "lead", text: "Yes, 2 PM works for me. I'll be there.", timestamp: "0:15" },
  { role: "agent", text: "Perfect! I've confirmed your appointment for tomorrow, January 15th at 2 PM. You'll receive a confirmation email shortly. Is there anything else I can help you with?", timestamp: "0:22" },
  { role: "lead", text: "No, that's all. Thank you!", timestamp: "0:35" },
  { role: "agent", text: "Thank you for confirming. Have a great day!", timestamp: "0:38" },
];

const mockCallPlan = {
  call_type: "OUTBOUND_REMINDER",
  allowed_intents: ["CONFIRM", "RESCHEDULE", "CANCEL"],
  fallback: "HANDOFF_TO_HUMAN",
  confidence_threshold: 0.7,
  script_template: "reminder_v1",
};

const mockClassification = {
  intent: "CONFIRMED",
  confidence: 0.91,
  sentiment: "positive",
  commitment_level: "high",
  datetime: "2025-01-15T14:00Z",
};

export function CallDetail({ call }: CallDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showCallPlan, setShowCallPlan] = useState(false);
  const [showClassification, setShowClassification] = useState(false);

  const initials = call.leadName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-lg font-medium text-foreground">{initials}</span>
            </div>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
              call.type === "inbound" ? "bg-emerald-500/20" : "bg-primary/20"
            )}>
              {call.type === "inbound" ? (
                <PhoneIncoming className="w-4 h-4 text-emerald-400" />
              ) : (
                <PhoneOutgoing className="w-4 h-4 text-primary" />
              )}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{call.leadName}</h2>
            <p className="text-muted-foreground">{call.leadCompany}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="capitalize">{call.type}</Badge>
              <Badge variant="secondary" className="capitalize">{call.purpose}</Badge>
              <Badge variant="secondary" className="capitalize">{call.status}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Again
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </div>

      {/* Call Info */}
      <div className="p-6 border-b border-border grid grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Duration</p>
          <p className="text-sm font-medium text-foreground flex items-center gap-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            {call.duration || "0:42"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
          <p className="text-sm font-medium text-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            {call.completedAt || call.scheduledAt || "Jan 14, 2025 10:30 AM"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Outcome</p>
          <p className="text-sm font-medium text-foreground flex items-center gap-1">
            {call.outcome === "confirmed" || call.outcome === "booked" ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : call.outcome === "declined" || call.outcome === "cancelled" ? (
              <XCircle className="w-4 h-4 text-destructive" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400" />
            )}
            <span className="capitalize">{call.outcome || "Confirmed"}</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Confidence</p>
          <p className="text-sm font-medium text-foreground flex items-center gap-1">
            <span className={cn(
              "w-2 h-2 rounded-full",
              (call.confidence || 0.91) >= 0.8 ? "bg-emerald-400" : (call.confidence || 0.91) >= 0.5 ? "bg-amber-400" : "bg-destructive"
            )} />
            {Math.round((call.confidence || 0.91) * 100)}%
          </p>
        </div>
      </div>

      {/* Audio Player */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary" />
            ) : (
              <Play className="w-5 h-5 text-primary ml-0.5" />
            )}
          </Button>
          <div className="flex-1">
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-primary rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0:14</span>
              <span>0:42</span>
            </div>
          </div>
          <Button size="icon" variant="ghost">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Transcript */}
        <Collapsible open={showTranscript} onOpenChange={setShowTranscript}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Call Transcript</span>
            </div>
            {showTranscript ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-3 p-4 rounded-lg bg-card/30 border border-border">
              {mockTranscript.map((entry, index) => (
                <div key={index} className={cn(
                  "flex gap-3",
                  entry.role === "agent" ? "justify-start" : "justify-end"
                )}>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    entry.role === "agent" 
                      ? "bg-primary/10 border border-primary/20" 
                      : "bg-muted"
                  )}>
                    <p className="text-sm text-foreground">{entry.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Call Plan */}
        <Collapsible open={showCallPlan} onOpenChange={setShowCallPlan}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Call Plan</span>
            </div>
            {showCallPlan ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="p-4 rounded-lg bg-card/30 border border-border">
              <pre className="text-xs text-muted-foreground overflow-x-auto">
                {JSON.stringify(mockCallPlan, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Classification */}
        <Collapsible open={showClassification} onOpenChange={setShowClassification}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">AI Classification</span>
            </div>
            {showClassification ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="p-4 rounded-lg bg-card/30 border border-border">
              <pre className="text-xs text-muted-foreground overflow-x-auto">
                {JSON.stringify(mockClassification, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

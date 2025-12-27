import { useState } from "react";
import { 
  FileText, Plus, Edit, Trash2, Save, Copy, CheckCircle, 
  PhoneIncoming, PhoneOutgoing, ChevronDown, ChevronRight,
  AlertCircle, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ScriptSegment {
  id: string;
  type: "greeting" | "identity" | "intent" | "confirmation" | "closing" | "fallback";
  content: string;
  ttsVoice?: string;
  conditions?: string[];
}

interface Script {
  id: string;
  name: string;
  type: "inbound" | "outbound";
  purpose: "booking" | "reminder";
  version: string;
  status: "active" | "draft" | "archived";
  allowedIntents: string[];
  maxTurns: number;
  confidenceThreshold: number;
  segments: ScriptSegment[];
  createdAt: string;
  updatedAt: string;
}

const mockScripts: Script[] = [
  {
    id: "1",
    name: "Inbound Booking - Standard",
    type: "inbound",
    purpose: "booking",
    version: "2.1",
    status: "active",
    allowedIntents: ["BOOK", "RESCHEDULE", "DECLINE"],
    maxTurns: 8,
    confidenceThreshold: 0.7,
    segments: [
      { id: "s1", type: "greeting", content: "Hello, thank you for calling {company_name}. This is an AI assistant helping with appointment bookings." },
      { id: "s2", type: "identity", content: "May I have your name please to look up your information?" },
      { id: "s3", type: "intent", content: "I'd be happy to help you schedule an appointment. What date and time works best for you?" },
      { id: "s4", type: "confirmation", content: "Perfect. I have you scheduled for {datetime}. You'll receive a confirmation email shortly." },
      { id: "s5", type: "closing", content: "Thank you for calling. Have a great day!" },
      { id: "s6", type: "fallback", content: "I apologize, but I need to transfer you to a human representative who can better assist you." },
    ],
    createdAt: "2025-01-10",
    updatedAt: "2025-01-25",
  },
  {
    id: "2",
    name: "Outbound Reminder - Standard",
    type: "outbound",
    purpose: "reminder",
    version: "1.3",
    status: "active",
    allowedIntents: ["CONFIRM", "RESCHEDULE", "CANCEL"],
    maxTurns: 6,
    confidenceThreshold: 0.7,
    segments: [
      { id: "s1", type: "greeting", content: "Hello {lead_name}, this is an automated call from {company_name}." },
      { id: "s2", type: "identity", content: "Am I speaking with {lead_name}?" },
      { id: "s3", type: "intent", content: "I'm calling to remind you about your upcoming appointment on {datetime}. Will you be able to make it?" },
      { id: "s4", type: "confirmation", content: "Great, your appointment is confirmed for {datetime}. We look forward to seeing you." },
      { id: "s5", type: "closing", content: "Thank you. Goodbye!" },
      { id: "s6", type: "fallback", content: "I'll have someone from our team reach out to you directly. Thank you." },
    ],
    createdAt: "2025-01-05",
    updatedAt: "2025-01-20",
  },
  {
    id: "3",
    name: "Inbound Booking - Enterprise",
    type: "inbound",
    purpose: "booking",
    version: "1.0",
    status: "draft",
    allowedIntents: ["BOOK", "RESCHEDULE", "DECLINE", "TRANSFER"],
    maxTurns: 10,
    confidenceThreshold: 0.8,
    segments: [
      { id: "s1", type: "greeting", content: "Welcome to {company_name} Enterprise Services. How may I assist you today?" },
      { id: "s2", type: "identity", content: "Could you please provide your company name and your role?" },
      { id: "s3", type: "intent", content: "I can help schedule a consultation with our enterprise team. What's your preferred availability?" },
      { id: "s4", type: "confirmation", content: "Excellent. Your enterprise consultation is scheduled for {datetime}." },
      { id: "s5", type: "closing", content: "Thank you for choosing {company_name}. We appreciate your business." },
      { id: "s6", type: "fallback", content: "Let me connect you with our enterprise specialists." },
    ],
    createdAt: "2025-01-22",
    updatedAt: "2025-01-22",
  },
];

const segmentTypeLabels: Record<ScriptSegment["type"], { label: string; icon: React.ReactNode }> = {
  greeting: { label: "Greeting", icon: <MessageSquare className="w-3.5 h-3.5" /> },
  identity: { label: "Identity Confirm", icon: <CheckCircle className="w-3.5 h-3.5" /> },
  intent: { label: "Intent Collection", icon: <FileText className="w-3.5 h-3.5" /> },
  confirmation: { label: "Confirmation", icon: <CheckCircle className="w-3.5 h-3.5" /> },
  closing: { label: "Closing", icon: <MessageSquare className="w-3.5 h-3.5" /> },
  fallback: { label: "Fallback/Escalation", icon: <AlertCircle className="w-3.5 h-3.5" /> },
};

export function CallScriptEditor() {
  const { toast } = useToast();
  const [scripts, setScripts] = useState<Script[]>(mockScripts);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [expandedSegments, setExpandedSegments] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const toggleSegment = (segmentId: string) => {
    setExpandedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleSave = () => {
    toast({
      title: "Script Saved",
      description: "Your changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleDuplicate = (script: Script) => {
    const newScript: Script = {
      ...script,
      id: Date.now().toString(),
      name: `${script.name} (Copy)`,
      status: "draft",
      version: "1.0",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setScripts([...scripts, newScript]);
    toast({
      title: "Script Duplicated",
      description: "A copy of the script has been created.",
    });
  };

  const activeScripts = scripts.filter(s => s.status === "active");
  const draftScripts = scripts.filter(s => s.status === "draft");

  return (
    <div className="flex h-full gap-6">
      {/* Script List */}
      <div className="w-80 flex-shrink-0 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Script Templates</h3>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>

        {/* Active Scripts */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active</p>
          {activeScripts.map((script) => (
            <Card 
              key={script.id}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                selectedScript?.id === script.id && "border-primary bg-primary/5"
              )}
              onClick={() => setSelectedScript(script)}
            >
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {script.type === "inbound" ? (
                      <PhoneIncoming className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <PhoneOutgoing className="w-4 h-4 text-primary" />
                    )}
                    <span className="font-medium text-sm text-foreground">{script.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">v{script.version}</Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-xs border-0">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Draft Scripts */}
        {draftScripts.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Drafts</p>
            {draftScripts.map((script) => (
              <Card 
                key={script.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary/50",
                  selectedScript?.id === script.id && "border-primary bg-primary/5"
                )}
                onClick={() => setSelectedScript(script)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {script.type === "inbound" ? (
                        <PhoneIncoming className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <PhoneOutgoing className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="font-medium text-sm text-foreground">{script.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">v{script.version}</Badge>
                    <Badge variant="secondary" className="text-xs">Draft</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Script Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedScript ? (
          <div className="space-y-6">
            {/* Script Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {isEditing ? (
                    <Input 
                      value={selectedScript.name} 
                      className="text-xl font-bold w-96"
                      onChange={(e) => setSelectedScript({...selectedScript, name: e.target.value})}
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-foreground">{selectedScript.name}</h2>
                  )}
                  <Badge className={cn(
                    "border-0",
                    selectedScript.status === "active" 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {selectedScript.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Version {selectedScript.version} • Updated {selectedScript.updatedAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleDuplicate(selectedScript)}>
                      <Copy className="w-4 h-4 mr-1" />
                      Duplicate
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Script Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Script Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Call Type</Label>
                    <Select value={selectedScript.type} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inbound">Inbound</SelectItem>
                        <SelectItem value="outbound">Outbound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Purpose</Label>
                    <Select value={selectedScript.purpose} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Max Turns</Label>
                    <Input 
                      type="number" 
                      value={selectedScript.maxTurns} 
                      disabled={!isEditing}
                      onChange={(e) => setSelectedScript({...selectedScript, maxTurns: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confidence Threshold</Label>
                    <Input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="1"
                      value={selectedScript.confidenceThreshold} 
                      disabled={!isEditing}
                      onChange={(e) => setSelectedScript({...selectedScript, confidenceThreshold: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label>Allowed Intents</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedScript.allowedIntents.map((intent, i) => (
                      <Badge key={i} variant="secondary">{intent}</Badge>
                    ))}
                    {isEditing && (
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Script Segments */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Script Segments</CardTitle>
                <CardDescription>
                  Define the conversation flow for this call script
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedScript.segments.map((segment, index) => (
                  <Collapsible 
                    key={segment.id}
                    open={expandedSegments.includes(segment.id)}
                    onOpenChange={() => toggleSegment(segment.id)}
                  >
                    <div className="border border-border rounded-lg overflow-hidden">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </span>
                            <div className="flex items-center gap-2">
                              {segmentTypeLabels[segment.type].icon}
                              <span className="font-medium text-sm">{segmentTypeLabels[segment.type].label}</span>
                            </div>
                          </div>
                          {expandedSegments.includes(segment.id) ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-4 border-t border-border space-y-3">
                          <div className="space-y-2">
                            <Label>Script Content</Label>
                            <Textarea 
                              value={segment.content}
                              disabled={!isEditing}
                              className="min-h-[80px] font-mono text-sm"
                              onChange={(e) => {
                                const updatedSegments = selectedScript.segments.map(s =>
                                  s.id === segment.id ? {...s, content: e.target.value} : s
                                );
                                setSelectedScript({...selectedScript, segments: updatedSegments});
                              }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Available variables: {"{lead_name}"}, {"{company_name}"}, {"{datetime}"}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}

                {isEditing && (
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Segment
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Select a script to edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

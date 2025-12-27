import { useState } from "react";
import { Clock, Calendar, Shield, AlertTriangle, Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export function CallPolicySettings() {
  const [policies, setPolicies] = useState({
    // Time Windows
    startTime: "09:00",
    endTime: "18:00",
    timezone: "America/New_York",
    allowWeekends: false,
    
    // Frequency Limits
    maxCallsPerDay: 3,
    minTimeBetweenCalls: 24,
    maxAttemptsPerLead: 5,
    
    // Consent & Compliance
    requireConsent: true,
    respectDoNotCall: true,
    recordAllCalls: true,
    
    // Risk Thresholds
    minConfidenceThreshold: 70,
    autoEscalateOnLowConfidence: true,
    humanReviewRequired: false,
    
    // Call Types
    enableInboundBooking: true,
    enableOutboundReminders: true,
    enableFollowUpCalls: false,
  });

  const handleSave = () => {
    toast({
      title: "Policies Saved",
      description: "Your call policy settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Time Windows */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Time Windows</CardTitle>
          </div>
          <CardDescription>
            Define when calls can be made or received
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={policies.startTime}
                onChange={(e) => setPolicies({ ...policies, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={policies.endTime}
                onChange={(e) => setPolicies({ ...policies, endTime: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select value={policies.timezone} onValueChange={(v) => setPolicies({ ...policies, timezone: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Weekend Calls</Label>
              <p className="text-xs text-muted-foreground">Enable calls on Saturday and Sunday</p>
            </div>
            <Switch
              checked={policies.allowWeekends}
              onCheckedChange={(v) => setPolicies({ ...policies, allowWeekends: v })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Frequency Limits */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Frequency Limits</CardTitle>
          </div>
          <CardDescription>
            Control how often leads can be contacted
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Max Calls Per Lead Per Day</Label>
              <span className="text-sm text-muted-foreground">{policies.maxCallsPerDay}</span>
            </div>
            <Slider
              value={[policies.maxCallsPerDay]}
              onValueChange={([v]) => setPolicies({ ...policies, maxCallsPerDay: v })}
              min={1}
              max={10}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Min Hours Between Calls</Label>
              <span className="text-sm text-muted-foreground">{policies.minTimeBetweenCalls}h</span>
            </div>
            <Slider
              value={[policies.minTimeBetweenCalls]}
              onValueChange={([v]) => setPolicies({ ...policies, minTimeBetweenCalls: v })}
              min={1}
              max={72}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Max Attempts Per Lead</Label>
              <span className="text-sm text-muted-foreground">{policies.maxAttemptsPerLead}</span>
            </div>
            <Slider
              value={[policies.maxAttemptsPerLead]}
              onValueChange={([v]) => setPolicies({ ...policies, maxAttemptsPerLead: v })}
              min={1}
              max={20}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Consent & Compliance */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Consent & Compliance</CardTitle>
          </div>
          <CardDescription>
            Ensure legal compliance for all calls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Explicit Consent</Label>
              <p className="text-xs text-muted-foreground">Only call leads who have opted in</p>
            </div>
            <Switch
              checked={policies.requireConsent}
              onCheckedChange={(v) => setPolicies({ ...policies, requireConsent: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Respect Do-Not-Call List</Label>
              <p className="text-xs text-muted-foreground">Automatically skip DNC-registered numbers</p>
            </div>
            <Switch
              checked={policies.respectDoNotCall}
              onCheckedChange={(v) => setPolicies({ ...policies, respectDoNotCall: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Record All Calls</Label>
              <p className="text-xs text-muted-foreground">Store recordings for compliance and review</p>
            </div>
            <Switch
              checked={policies.recordAllCalls}
              onCheckedChange={(v) => setPolicies({ ...policies, recordAllCalls: v })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Thresholds */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Risk Thresholds</CardTitle>
          </div>
          <CardDescription>
            Configure AI confidence and escalation rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Min Confidence Threshold</Label>
              <span className="text-sm text-muted-foreground">{policies.minConfidenceThreshold}%</span>
            </div>
            <Slider
              value={[policies.minConfidenceThreshold]}
              onValueChange={([v]) => setPolicies({ ...policies, minConfidenceThreshold: v })}
              min={50}
              max={100}
              step={5}
            />
            <p className="text-xs text-muted-foreground">
              Calls below this confidence level will be flagged for review
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-Escalate on Low Confidence</Label>
              <p className="text-xs text-muted-foreground">Hand off to human when confidence is low</p>
            </div>
            <Switch
              checked={policies.autoEscalateOnLowConfidence}
              onCheckedChange={(v) => setPolicies({ ...policies, autoEscalateOnLowConfidence: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Human Review</Label>
              <p className="text-xs text-muted-foreground">All call outcomes require human approval</p>
            </div>
            <Switch
              checked={policies.humanReviewRequired}
              onCheckedChange={(v) => setPolicies({ ...policies, humanReviewRequired: v })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Call Types */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Enabled Call Types</CardTitle>
          </div>
          <CardDescription>
            Control which call types are active
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Inbound Booking Calls</Label>
              <p className="text-xs text-muted-foreground">Handle incoming appointment booking requests</p>
            </div>
            <Switch
              checked={policies.enableInboundBooking}
              onCheckedChange={(v) => setPolicies({ ...policies, enableInboundBooking: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Outbound Reminder Calls</Label>
              <p className="text-xs text-muted-foreground">Automated reminders for upcoming appointments</p>
            </div>
            <Switch
              checked={policies.enableOutboundReminders}
              onCheckedChange={(v) => setPolicies({ ...policies, enableOutboundReminders: v })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Follow-up Calls</Label>
              <p className="text-xs text-muted-foreground">Post-appointment follow-up calls</p>
            </div>
            <Switch
              checked={policies.enableFollowUpCalls}
              onCheckedChange={(v) => setPolicies({ ...policies, enableFollowUpCalls: v })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Policy Settings
        </Button>
      </div>
    </div>
  );
}

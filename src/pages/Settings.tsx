import { useState } from "react";
import { Building2, Mail, Phone, Users, CreditCard, Link, Shield, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "email", label: "Email Accounts", icon: Mail },
  { id: "voice", label: "Voice", icon: Phone },
  { id: "integrations", label: "Integrations", icon: Link },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("organization");

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization and preferences</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Navigation */}
        <div className="w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          {activeTab === "organization" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Organization Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Company Name</label>
                    <input type="text" defaultValue="Acme Corp" className="input-field" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
                    <input type="url" defaultValue="https://acmecorp.com" className="input-field" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Industry</label>
                    <select className="input-field">
                      <option>SaaS / Software</option>
                      <option>E-commerce</option>
                      <option>Consulting</option>
                      <option>Agency</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Timezone</label>
                    <select className="input-field">
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Branding</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Company Logo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <button className="btn-secondary">Upload Logo</button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        defaultValue="#00d4ff" 
                        className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                      />
                      <input type="text" defaultValue="#00d4ff" className="input-field w-32" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Connected Email Accounts</h2>
                  <button className="btn-primary">Add Account</button>
                </div>

                <div className="space-y-4">
                  {[
                    { email: "john@acmecorp.com", provider: "Google", status: "healthy", dailySent: 145, limit: 200 },
                    { email: "sales@acmecorp.com", provider: "Google", status: "healthy", dailySent: 89, limit: 200 },
                    { email: "outreach@acmecorp.com", provider: "Microsoft", status: "warming", dailySent: 23, limit: 50 },
                  ].map((account, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{account.email}</p>
                          <p className="text-xs text-muted-foreground">{account.provider} • {account.dailySent}/{account.limit} today</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          account.status === "healthy" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                        )}>
                          {account.status}
                        </span>
                        <button className="btn-ghost text-sm">Configure</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">CRM & Calendar</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "HubSpot", connected: true },
                    { name: "Salesforce", connected: false },
                    { name: "Pipedrive", connected: false },
                    { name: "Google Calendar", connected: true },
                  ].map((integration, i) => (
                    <div key={i} className="p-4 rounded-lg border border-border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Link className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{integration.name}</span>
                      </div>
                      <button className={cn(
                        "text-sm font-medium",
                        integration.connected ? "text-destructive" : "text-primary"
                      )}>
                        {integration.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Team Members</h2>
                  <button className="btn-primary">Invite Member</button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "John Doe", email: "john@acmecorp.com", role: "Admin" },
                    { name: "Sarah Smith", email: "sarah@acmecorp.com", role: "Member" },
                    { name: "Mike Johnson", email: "mike@acmecorp.com", role: "Member" },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select className="input-field text-sm py-1.5 w-auto">
                          <option selected={member.role === "Admin"}>Admin</option>
                          <option selected={member.role === "Member"}>Member</option>
                          <option>Viewer</option>
                        </select>
                        <button className="text-sm text-destructive hover:underline">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!["organization", "email", "integrations", "team"].includes(activeTab) && (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <p className="text-muted-foreground">Settings for {tabs.find(t => t.id === activeTab)?.label} coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

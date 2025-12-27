import { useState } from "react";
import { Mail, Phone, Calendar, Building2, ExternalLink, Sparkles, Send, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "sent" | "received";
  content: string;
  timestamp: string;
  channel: "email" | "call";
}

interface Conversation {
  id: string;
  leadName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  stage: string;
  messages: Message[];
}

const mockConversation: Conversation = {
  id: "1",
  leadName: "Sarah Chen",
  company: "TechCorp",
  role: "VP of Sales",
  email: "sarah@techcorp.com",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/sarahchen",
  stage: "warm",
  messages: [
    {
      id: "1",
      type: "sent",
      content: "Hi Sarah,\n\nI noticed TechCorp recently expanded into the enterprise market. Many sales teams in similar positions have struggled with scaling outreach while maintaining personalization.\n\nWe've helped companies like yours book 3x more qualified demos through AI-powered outreach. Would you be open to a quick chat this week?\n\nBest,\nJohn",
      timestamp: "Jan 25, 10:30 AM",
      channel: "email",
    },
    {
      id: "2",
      type: "received",
      content: "Hi John,\n\nThanks for reaching out! You're right – we're definitely feeling the scaling challenges. I'd be interested to learn more about what you're doing.\n\nCan you share some specifics on how the AI personalization works?\n\nBest,\nSarah",
      timestamp: "Jan 25, 2:45 PM",
      channel: "email",
    },
  ],
};

const aiSuggestions = [
  {
    id: "1",
    label: "Continue conversation",
    content: "Great question, Sarah! Our AI analyzes over 50 data points per lead including company news, tech stack, recent hires, and industry trends to craft truly personalized messages. The result? Open rates averaging 45% and reply rates of 22%.\n\nWould you have 15 minutes tomorrow to see a quick demo? I can show you exactly how it would work for TechCorp's specific use case.",
  },
  {
    id: "2",
    label: "Share case study",
    content: "Absolutely! I'll share a specific example: We helped Acme Sales (similar enterprise SaaS company) increase their booked demos by 180% in 90 days while their SDR team actually decreased cold outreach time by 60%.\n\nI'd love to walk you through the specifics and discuss how we could replicate this for TechCorp. Does Thursday at 2pm work for a quick call?",
  },
  {
    id: "3",
    label: "Ask qualifying questions",
    content: "Happy to explain! Before I dive in, a few quick questions to make sure I share the most relevant info:\n\n1. What's your current monthly demo target?\n2. How many SDRs are on your team?\n3. What's your main challenge – lead quality or volume?\n\nThis will help me show you exactly where we can make the biggest impact.",
  },
];

export function ConversationDetail() {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showLeadDetails, setShowLeadDetails] = useState(false);

  const handleSuggestionClick = (suggestion: typeof aiSuggestions[0]) => {
    setSelectedSuggestion(suggestion.id);
    setReplyContent(suggestion.content);
  };

  return (
    <div className="flex h-full">
      {/* Main Thread */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 pl-14 border-b border-border">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowLeadDetails(true)}
              className="text-left hover:opacity-80 transition-opacity"
            >
              <h2 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">{mockConversation.leadName}</h2>
              <p className="text-sm text-muted-foreground">{mockConversation.role} at {mockConversation.company}</p>
            </button>
            <div className="flex items-center gap-2">
              <button className="btn-secondary">
                <Calendar className="w-4 h-4" />
                Book Meeting
              </button>
              <button className="btn-ghost border border-border">
                <Phone className="w-4 h-4" />
                Call with AI
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {mockConversation.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-2xl",
                message.type === "sent" ? "ml-auto" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "rounded-xl p-4",
                  message.type === "sent"
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted"
                )}
              >
                <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">{message.content}</pre>
              </div>
              <div className={cn(
                "flex items-center gap-2 mt-2 text-xs text-muted-foreground",
                message.type === "sent" ? "justify-end" : "justify-start"
              )}>
                <Clock className="w-3 h-3" />
                <span>{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="px-4 py-3 border-t border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">AI Suggested Replies</span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            {aiSuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                  selectedSuggestion === suggestion.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>

        {/* Composer - Simplified with inline send button */}
        <div className="p-4 border-t border-border/50">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Type your reply..."
                className="w-full h-12 py-3 px-4 rounded-lg bg-muted/30 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = '48px';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <div className="flex items-end gap-2">
              <button className="h-12 px-3 text-muted-foreground hover:text-foreground transition-colors">
                <Clock className="w-4 h-4" />
              </button>
              <button 
                className="h-12 px-4 btn-primary rounded-lg"
                disabled={!replyContent.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Details Sidebar - Only shown when clicking on name */}
      {showLeadDetails && (
        <div className="w-80 border-l border-border p-4 overflow-y-auto scrollbar-thin animate-slide-in-right">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Lead Details</h3>
            <button 
              onClick={() => setShowLeadDetails(false)}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${mockConversation.email}`} className="text-sm text-primary hover:underline">
                  {mockConversation.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{mockConversation.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                <a href={`https://${mockConversation.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Company</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{mockConversation.company}</p>
                  <p className="text-xs text-muted-foreground">Enterprise SaaS • 500-1000 employees</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Stage</h4>
              <select className="input-field text-sm" defaultValue="warm">
                <option value="leads">Leads</option>
                <option value="outreach">Outreach</option>
                <option value="warm">Warm</option>
                <option value="nurture">Nurture</option>
                <option value="opportunity">Opportunity</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full btn-secondary justify-start text-sm">
                  Move to Opportunity
                </button>
                <button className="w-full btn-ghost border border-border justify-start text-sm">
                  Add to Nurture
                </button>
                <button className="w-full btn-ghost border border-border justify-start text-sm text-destructive hover:bg-destructive/10">
                  Disqualify Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

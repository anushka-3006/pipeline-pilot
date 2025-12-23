import { useState } from "react";
import { Search, Filter, Mail, Phone, Clock, Star } from "lucide-react";
import { ConversationItem } from "@/components/inbox/ConversationItem";
import { ConversationDetail } from "@/components/inbox/ConversationDetail";
import { cn } from "@/lib/utils";

const mockConversations = [
  {
    id: "1",
    leadName: "Sarah Chen",
    company: "TechCorp",
    subject: "Re: Quick question about your Q1 goals",
    snippet: "Thanks for reaching out! You're right – we're definitely feeling the scaling challenges...",
    channel: "email" as const,
    stage: "warm",
    timestamp: "2:45 PM",
    isUnread: true,
    hasAiSuggestion: true,
    needsReview: false,
  },
  {
    id: "2",
    leadName: "Marcus Johnson",
    company: "InnovateLabs",
    subject: "Demo scheduled for tomorrow",
    snippet: "Looking forward to our call tomorrow at 2pm. I'll have our CTO join as well.",
    channel: "email" as const,
    stage: "opportunity",
    timestamp: "11:30 AM",
    isUnread: false,
    hasAiSuggestion: false,
    needsReview: false,
  },
  {
    id: "3",
    leadName: "David Park",
    company: "NextGen",
    subject: "AI Call Summary",
    snippet: "Call completed - Lead qualified for enterprise plan. Key pain points: scaling outreach...",
    channel: "call" as const,
    stage: "warm",
    timestamp: "10:15 AM",
    isUnread: true,
    hasAiSuggestion: true,
    needsReview: true,
  },
  {
    id: "4",
    leadName: "Jennifer Wu",
    company: "BuildFast",
    subject: "Re: Increasing demo bookings",
    snippet: "This sounds interesting but we're not looking to make changes until Q2...",
    channel: "email" as const,
    stage: "nurture",
    timestamp: "Yesterday",
    isUnread: false,
    hasAiSuggestion: true,
    needsReview: false,
  },
  {
    id: "5",
    leadName: "Robert Taylor",
    company: "FinanceHub",
    subject: "Out of Office",
    snippet: "I am currently out of the office with limited access to email. I will return on...",
    channel: "email" as const,
    stage: "outreach",
    timestamp: "Yesterday",
    isUnread: false,
    hasAiSuggestion: false,
    needsReview: false,
  },
];

const filters = [
  { id: "all", label: "All", count: 24 },
  { id: "unread", label: "Unread", count: 5 },
  { id: "needs_review", label: "Needs Review", count: 3 },
  { id: "ai_suggested", label: "AI Suggested", count: 8 },
];

export default function Inbox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0].id);

  const filteredConversations = mockConversations.filter(conv => {
    if (activeFilter === "unread" && !conv.isUnread) return false;
    if (activeFilter === "needs_review" && !conv.needsReview) return false;
    if (activeFilter === "ai_suggested" && !conv.hasAiSuggestion) return false;
    if (searchQuery && !conv.leadName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !conv.subject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-screen flex animate-fade-in">
      {/* Conversations List */}
      <div className="w-96 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-foreground mb-4">Inbox</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-2 border-b border-border flex gap-1 overflow-x-auto scrollbar-thin">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                activeFilter === filter.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {filter.label}
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                activeFilter === filter.id ? "bg-primary/20" : "bg-muted"
              )}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filteredConversations.map((conversation, index) => (
            <div
              key={conversation.id}
              className="animate-slide-in-bottom"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <ConversationItem
                conversation={conversation}
                isActive={selectedConversation === conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Detail */}
      <div className="flex-1">
        <ConversationDetail />
      </div>
    </div>
  );
}

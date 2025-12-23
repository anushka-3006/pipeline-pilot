import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Send,
  Inbox,
  Shield,
  Settings,
  Zap,
  ChevronDown,
  Bell,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Leads & Pipeline", href: "/pipeline", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Send },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Email Health", href: "/health", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary glow-primary">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Autonyze</h1>
          <p className="text-xs text-muted-foreground">AI SDR Engine</p>
        </div>
      </div>

      {/* Org Switcher */}
      <div className="px-4 py-4">
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AC</span>
            </div>
            <span className="text-sm font-medium text-sidebar-foreground">Acme Corp</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn("nav-item", isActive && "active")}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button className="nav-item w-full">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
          <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            3
          </span>
        </button>
        <button className="nav-item w-full">
          <HelpCircle className="w-5 h-5" />
          <span>Help & Docs</span>
        </button>
      </div>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@acmecorp.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

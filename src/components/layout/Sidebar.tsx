import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Send,
  Inbox,
  Shield,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Leads & Pipeline", href: "/pipeline", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Send },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Email Health", href: "/health", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen glass-sidebar flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain flex-shrink-0" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto scrollbar-thin">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "nav-item",
                isActive && "active",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t border-white/10 space-y-1">
        <button className={cn("nav-item w-full", collapsed && "justify-center px-2")} title={collapsed ? "Notifications" : undefined}>
          <Bell className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <>
              <span>Notifications</span>
              <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                3
              </span>
            </>
          )}
          {collapsed && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
        <button className={cn("nav-item w-full", collapsed && "justify-center px-2")} title={collapsed ? "Help & Docs" : undefined}>
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Help & Docs</span>}
        </button>
      </div>

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@company.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-foreground" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-foreground" />
        )}
      </button>
    </aside>
  );
}

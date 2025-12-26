import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Send,
  Inbox,
  Shield,
  Settings,
  ChevronDown,
  Bell,
  HelpCircle,
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

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 glass-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin">
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
      <div className="p-4 border-t border-white/10 space-y-2">
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
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

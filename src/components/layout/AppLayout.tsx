import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import background from "@/assets/background.jpg";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 z-0 bg-background/70 backdrop-blur-sm" />
      
      {/* Floating orbs for decoration */}
      <div className="bg-orb bg-orb-primary w-96 h-96 -top-48 -right-48 float" />
      <div className="bg-orb bg-orb-accent w-80 h-80 bottom-20 -left-40 float-delayed" />
      
      {/* Content */}
      <div className="relative z-10">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "pl-16" : "pl-64"
        )}>
          <div className="min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

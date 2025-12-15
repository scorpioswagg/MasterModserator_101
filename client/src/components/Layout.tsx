import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, FileText, LogOut, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth && location !== "/login") {
      setLocation("/login");
    } else {
      setIsAuthenticated(!!auth);
    }
  }, [location, setLocation]);

  if (location === "/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "Groups", href: "/groups" },
    { icon: FileText, label: "Logs", href: "/logs" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <ShieldAlert className="h-8 w-8" />
            <span className="font-mono font-bold text-lg tracking-tight">MASTER MOD</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-mono">v1.0.1 BUILD 2024</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200",
                  location === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              setLocation("/login");
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background relative">
         {/* Background Grid Effect */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

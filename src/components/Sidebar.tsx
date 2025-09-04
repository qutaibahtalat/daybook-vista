import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  PlusCircle,
  BarChart3,
  Calendar,
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Ledgers", href: "/ledgers", icon: BookOpen },
  { name: "Add Transaction", href: "/transaction", icon: PlusCircle },
  { name: "Daily Diary", href: "/diary", icon: Calendar },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Khata Pro</h1>
                <p className="text-xs text-muted-foreground">Digital Ledger</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 p-0"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-muted/50 group relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary-foreground")} />
              {!isCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Khata Pro v1.0
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
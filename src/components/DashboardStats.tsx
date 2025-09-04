import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Calculator } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

function StatCard({ title, value, change, trend, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="card-gradient">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center space-x-2 mt-2">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-error" />
          )}
          <Badge 
            variant="secondary" 
            className={trend === "up" ? "status-credit" : "status-debit"}
          >
            {change}
          </Badge>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Credit",
      value: "₹1,24,500",
      change: "+12.5%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "Amount to receive"
    },
    {
      title: "Total Debit", 
      value: "₹89,200",
      change: "+8.2%",
      trend: "up" as const,
      icon: TrendingDown,
      description: "Amount to pay"
    },
    {
      title: "Net Balance",
      value: "₹35,300",
      change: "+4.3%",
      trend: "up" as const,
      icon: Calculator,
      description: "Credit - Debit"
    },
    {
      title: "Active Customers",
      value: "48",
      change: "+3",
      trend: "up" as const,
      icon: Users,
      description: "This month"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
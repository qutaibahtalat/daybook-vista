import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WeeklyTrend, MonthlyComparison, BalanceBreakdown } from "@/components/Charts";
import { DashboardStats } from "@/components/DashboardStats";
import { Download, TrendingUp, Calendar, BarChart } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive financial insights and trends</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <DashboardStats />

      {/* Report Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-gradient cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold">Income Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly patterns</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <BarChart className="w-8 h-8 text-success mx-auto mb-2" />
            <h3 className="font-semibold">Balance Analysis</h3>
            <p className="text-sm text-muted-foreground">Outstanding amounts</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-warning mx-auto mb-2" />
            <h3 className="font-semibold">Daily Summary</h3>
            <p className="text-sm text-muted-foreground">Day-wise breakdown</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Download className="w-8 h-8 text-error mx-auto mb-2" />
            <h3 className="font-semibold">Export Data</h3>
            <p className="text-sm text-muted-foreground">PDF & Excel reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <WeeklyTrend />
        <MonthlyComparison />
      </div>

      <BalanceBreakdown />

      {/* Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Customers by Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ramesh Kumar", balance: 25000, percentage: 35 },
                { name: "Mohan Lal", balance: 18500, percentage: 26 },
                { name: "Priya Sharma", balance: 15200, percentage: 21 },
                { name: "Sunita Devi", balance: 12800, percentage: 18 }
              ].map((customer, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{customer.name}</span>
                    <span className="text-success font-semibold">₹{customer.balance.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full" 
                      style={{ width: `${customer.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "January", income: 45000, expense: 32000 },
                { month: "February", income: 52000, expense: 38000 },
                { month: "March", income: 48000, expense: 35000 },
                { month: "April", income: 58000, expense: 42000 }
              ].map((month, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                  <span className="font-medium">{month.month}</span>
                  <div className="text-right">
                    <p className="text-success font-semibold">+₹{month.income.toLocaleString()}</p>
                    <p className="text-error text-sm">-₹{month.expense.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
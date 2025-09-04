import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/DashboardStats";
import { WeeklyTrend, MonthlyComparison, BalanceBreakdown } from "@/components/Charts";
import { PlusCircle, Users, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import dashboardHero from "@/assets/dashboard-hero.jpg";

export default function Dashboard() {
  const recentTransactions = [
    { id: 1, name: "Ramesh Kumar", type: "credit", amount: 5000, date: "Today", time: "2:30 PM" },
    { id: 2, name: "Sunita Devi", type: "debit", amount: 3200, date: "Today", time: "1:15 PM" },
    { id: 3, name: "Mohan Lal", type: "credit", amount: 8500, date: "Yesterday", time: "5:45 PM" },
    { id: 4, name: "Priya Sharma", type: "debit", amount: 2800, date: "Yesterday", time: "3:20 PM" },
  ];

  const topCustomers = [
    { name: "Rajesh Gupta", balance: 25000, type: "credit" },
    { name: "Meena Singh", balance: 18500, type: "credit" },
    { name: "Anil Yadav", balance: 15200, type: "debit" },
    { name: "Kavita Jain", balance: 12800, type: "credit" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-hero rounded-xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome to Khata Pro
              </h1>
              <p className="text-lg text-white/90 mb-4">
                Manage your digital ledger with ease and precision
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/transaction">
                  <Button className="btn-hero">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </Link>
                <Link to="/customers">
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Customers
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={dashboardHero} 
                alt="Dashboard Overview" 
                className="w-48 h-32 object-cover rounded-lg opacity-80"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <WeeklyTrend />
        <MonthlyComparison />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <BalanceBreakdown />
        </div>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/transaction" className="block">
              <Button className="w-full justify-start" variant="outline">
                <PlusCircle className="w-4 h-4 mr-2" />
                New Transaction
              </Button>
            </Link>
            <Link to="/customers" className="block">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </Link>
            <Link to="/diary" className="block">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Daily Diary
              </Button>
            </Link>
            <Link to="/reports" className="block">
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'credit' ? 'bg-success' : 'bg-error'
                    }`} />
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'credit' ? 'text-success' : 'text-error'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Customer Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {customer.type === 'credit' ? 'To receive' : 'To pay'}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    customer.type === 'credit' ? 'text-success' : 'text-error'
                  }`}>
                    ₹{customer.balance.toLocaleString()}
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
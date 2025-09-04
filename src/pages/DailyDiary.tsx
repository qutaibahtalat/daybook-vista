import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Calendar as CalendarIcon,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  id: number;
  time: string;
  customer: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: 1,
    time: "09:30 AM",
    customer: "Ramesh Kumar",
    type: "credit",
    amount: 5000,
    description: "Payment received for goods"
  },
  {
    id: 2,
    time: "11:15 AM", 
    customer: "Sunita Devi",
    type: "debit",
    amount: 3200,
    description: "Payment made for services"
  },
  {
    id: 3,
    time: "02:30 PM",
    customer: "Mohan Lal",
    type: "credit",
    amount: 8500,
    description: "Outstanding balance cleared"
  },
  {
    id: 4,
    time: "04:45 PM",
    customer: "Priya Sharma", 
    type: "debit",
    amount: 2800,
    description: "Purchase of inventory"
  },
  {
    id: 5,
    time: "06:20 PM",
    customer: "Rajesh Gupta",
    type: "credit",
    amount: 12000,
    description: "New order payment"
  }
];

export default function DailyDiary() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [transactions] = useState<Transaction[]>(sampleTransactions);

  const todayTransactions = transactions; // In real app, filter by selectedDate
  
  const totalCredit = todayTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalDebit = todayTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netBalance = totalCredit - totalDebit;
  const openingBalance = 25000; // This would come from previous day's closing
  const closingBalance = openingBalance + netBalance;

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Daily Diary</h1>
          <p className="text-muted-foreground">Track daily transactions and balances</p>
        </div>
        <Link to="/transaction">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-none"
            />
          </CardContent>
        </Card>

        {/* Daily Summary */}
        <div className="lg:col-span-3 space-y-6">
          {/* Date Navigation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateDate('prev')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="text-center">
                  <h2 className="text-xl font-semibold flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                  </h2>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateDate('next')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Balance Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Opening Balance</span>
                </div>
                <p className="text-xl font-bold">₹{openingBalance.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">Total Credit</span>
                </div>
                <p className="text-xl font-bold text-success">+₹{totalCredit.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-error" />
                  <span className="text-sm text-muted-foreground">Total Debit</span>
                </div>
                <p className="text-xl font-bold text-error">-₹{totalDebit.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Closing Balance</span>
                </div>
                <p className={`text-xl font-bold ${closingBalance >= 0 ? 'text-success' : 'text-error'}`}>
                  ₹{closingBalance.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Daily Transactions</span>
                <Badge variant="secondary">{todayTransactions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No transactions recorded for this date</p>
                  <Link to="/transaction">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Transaction
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayTransactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-muted-foreground font-mono">
                          {transaction.time}
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.type === 'credit' ? 'bg-success' : 'bg-error'
                        }`} />
                        <div>
                          <p className="font-medium">{transaction.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.type === 'credit' ? 'text-success' : 'text-error'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <Badge className={transaction.type === 'credit' ? 'status-credit' : 'status-debit'}>
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Net Summary */}
          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Daily Net Movement</h3>
                <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-success' : 'text-error'}`}>
                  {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {netBalance >= 0 
                    ? "Positive cash flow for the day" 
                    : "Negative cash flow for the day"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import emptyLedger from "@/assets/empty-ledger.jpg";

const sampleLedgers = [
  {
    id: 1,
    name: "Ramesh Kumar",
    balance: 25000,
    type: "credit" as const,
    lastTransaction: "2 days ago",
    totalTransactions: 24
  },
  {
    id: 2,
    name: "Sunita Devi",
    balance: 8500,
    type: "debit" as const,
    lastTransaction: "1 day ago",
    totalTransactions: 12
  },
  {
    id: 3,
    name: "Mohan Lal",
    balance: 12800,
    type: "credit" as const,
    lastTransaction: "3 days ago",
    totalTransactions: 18
  }
];

export default function Ledgers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Ledgers</h1>
          <p className="text-muted-foreground">View detailed transaction history for each customer</p>
        </div>
        <Link to="/customers">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </Link>
      </div>

      {sampleLedgers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <img 
            src={emptyLedger} 
            alt="No ledgers" 
            className="w-64 h-48 object-cover rounded-lg mb-6 opacity-60"
          />
          <h2 className="text-2xl font-semibold mb-2">No Ledgers Available</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Add customers first to create and manage their individual ledgers and transaction history.
          </p>
          <Link to="/customers">
            <Button className="btn-hero">
              <Plus className="w-4 h-4 mr-2" />
              Add First Customer
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleLedgers.map((ledger) => (
            <Card key={ledger.id} className="card-gradient hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{ledger.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {ledger.totalTransactions} transactions
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Balance</span>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      ledger.type === 'credit' ? 'text-success' : 'text-error'
                    }`}>
                      ₹{ledger.balance.toLocaleString()}
                    </p>
                    <Badge className={ledger.type === 'credit' ? 'status-credit' : 'status-debit'}>
                      {ledger.type === 'credit' ? 'To Receive' : 'To Pay'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last Transaction</span>
                  <span className="font-medium">{ledger.lastTransaction}</span>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Ledger Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
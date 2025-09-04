import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Minus, Save, User } from "lucide-react";
import { cn } from "@/lib/utils";
import transactionImage from "@/assets/transactions.jpg";

const sampleCustomers = [
  "Ramesh Kumar",
  "Sunita Devi", 
  "Mohan Lal",
  "Priya Sharma",
  "Rajesh Gupta",
  "Meena Singh"
];

export default function AddTransaction() {
  const [transactionType, setTransactionType] = useState<'credit' | 'debit'>('credit');
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally save the transaction
    console.log({
      type: transactionType,
      customer: isNewCustomer ? newCustomerName : selectedCustomer,
      amount: parseFloat(amount),
      description,
      date
    });

    // Reset form
    setSelectedCustomer("");
    setAmount("");
    setDescription("");
    setDate(new Date());
    setNewCustomerName("");
    setIsNewCustomer(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Add New Transaction</h1>
        <p className="text-muted-foreground">Record a credit or debit transaction</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Transaction Form */}
        <div className="md:col-span-2">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span>Transaction Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Transaction Type */}
                <div>
                  <Label className="text-base font-medium">Transaction Type</Label>
                  <div className="flex space-x-3 mt-2">
                    <Button
                      type="button"
                      variant={transactionType === 'credit' ? 'default' : 'outline'}
                      onClick={() => setTransactionType('credit')}
                      className={cn(
                        "flex-1",
                        transactionType === 'credit' && "bg-success hover:bg-success/90"
                      )}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Credit (Money In)
                    </Button>
                    <Button
                      type="button"
                      variant={transactionType === 'debit' ? 'default' : 'outline'}
                      onClick={() => setTransactionType('debit')}
                      className={cn(
                        "flex-1",
                        transactionType === 'debit' && "bg-error hover:bg-error/90"
                      )}
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Debit (Money Out)
                    </Button>
                  </div>
                </div>

                {/* Customer Selection */}
                <div>
                  <Label htmlFor="customer" className="text-base font-medium">
                    Customer
                  </Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={!isNewCustomer ? 'default' : 'outline'}
                        onClick={() => setIsNewCustomer(false)}
                        size="sm"
                      >
                        Existing Customer
                      </Button>
                      <Button
                        type="button"
                        variant={isNewCustomer ? 'default' : 'outline'}
                        onClick={() => setIsNewCustomer(true)}
                        size="sm"
                      >
                        New Customer
                      </Button>
                    </div>

                    {isNewCustomer ? (
                      <Input
                        placeholder="Enter new customer name"
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        required
                      />
                    ) : (
                      <Select value={selectedCustomer} onValueChange={setSelectedCustomer} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                        <SelectContent>
                          {sampleCustomers.map((customer) => (
                            <SelectItem key={customer} value={customer}>
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>{customer}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <Label htmlFor="amount" className="text-base font-medium">
                    Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="text-lg mt-2"
                  />
                </div>

                {/* Date */}
                <div>
                  <Label className="text-base font-medium">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-base font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter transaction details (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full btn-hero text-lg py-3">
                  <Save className="w-5 h-5 mr-2" />
                  Save Transaction
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Summary */}
        <div className="space-y-4">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <img 
                  src={transactionImage} 
                  alt="Transaction" 
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <Badge className={transactionType === 'credit' ? 'status-credit' : 'status-debit'}>
                    {transactionType === 'credit' ? 'Credit' : 'Debit'}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">
                    {isNewCustomer ? newCustomerName || 'New Customer' : selectedCustomer || 'Select Customer'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className={cn(
                    "font-bold text-lg",
                    transactionType === 'credit' ? 'text-success' : 'text-error'
                  )}>
                    {transactionType === 'credit' ? '+' : '-'}₹{amount || '0.00'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {format(date, "dd MMM yyyy")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>Ramesh Kumar</span>
                  <span className="text-success font-medium">+₹5,000</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Sunita Devi</span>
                  <span className="text-error font-medium">-₹3,200</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Mohan Lal</span>
                  <span className="text-success font-medium">+₹8,500</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
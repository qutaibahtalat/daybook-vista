import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  PlusCircle, 
  Search, 
  User, 
  Phone, 
  MapPin, 
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import emptyLedger from "@/assets/empty-ledger.jpg";

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  balance: number;
  type: 'credit' | 'debit';
  lastTransaction: string;
}

const sampleCustomers: Customer[] = [
  {
    id: 1,
    name: "Ramesh Kumar",
    phone: "+91 98765 43210",
    address: "Shop No. 15, Main Market, Delhi",
    balance: 25000,
    type: "credit",
    lastTransaction: "2 days ago"
  },
  {
    id: 2,
    name: "Sunita Devi",
    phone: "+91 87654 32109",
    address: "House No. 45, Gandhi Nagar, Mumbai",
    balance: 8500,
    type: "debit",
    lastTransaction: "1 day ago"
  },
  {
    id: 3,
    name: "Mohan Lal",
    phone: "+91 76543 21098",
    address: "Plot No. 23, Sector 12, Noida",
    balance: 12800,
    type: "credit",
    lastTransaction: "3 days ago"
  },
  {
    id: 4,
    name: "Priya Sharma",
    phone: "+91 65432 10987",
    address: "Flat 201, Residency Tower, Pune",
    balance: 5200,
    type: "debit",
    lastTransaction: "Today"
  }
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      const customer: Customer = {
        id: customers.length + 1,
        ...newCustomer,
        balance: 0,
        type: "credit",
        lastTransaction: "Never"
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", phone: "", address: "" });
      setIsAddDialogOpen(false);
    }
  };

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <img 
          src={emptyLedger} 
          alt="No customers" 
          className="w-64 h-48 object-cover rounded-lg mb-6 opacity-60"
        />
        <h2 className="text-2xl font-semibold mb-2">No Customers Yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Start by adding your first customer to begin managing their ledger and transactions.
        </p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add First Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="+91 12345 67890"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  placeholder="Enter full address"
                />
              </div>
              <Button onClick={handleAddCustomer} className="w-full">
                Add Customer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">Manage your customer database and their ledgers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="+91 12345 67890"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  placeholder="Enter full address"
                />
              </div>
              <Button onClick={handleAddCustomer} className="w-full">
                Add Customer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search customers by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customer Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="card-gradient">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <Badge 
                      className={customer.type === 'credit' ? 'status-credit' : 'status-debit'}
                    >
                      {customer.type === 'credit' ? 'To Receive' : 'To Pay'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="line-clamp-2">{customer.address}</span>
              </div>
              
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className={`font-semibold text-lg ${
                    customer.type === 'credit' ? 'text-success' : 'text-error'
                  }`}>
                    ₹{customer.balance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>Last transaction</span>
                  <span>{customer.lastTransaction}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No customers found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
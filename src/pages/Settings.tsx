import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Database, 
  Shield,
  Download,
  Upload
} from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your Khata Pro preferences and configurations</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" placeholder="Your Business Name" />
            </div>
            <div>
              <Label htmlFor="owner-name">Owner Name</Label>
              <Input id="owner-name" placeholder="Your Full Name" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 12345 67890" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="business@example.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Business Address</Label>
            <Input id="address" placeholder="Complete business address" />
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="daily-summary">Daily Summary</Label>
              <p className="text-sm text-muted-foreground">Get daily transaction summary</p>
            </div>
            <Switch id="daily-summary" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="payment-reminders">Payment Reminders</Label>
              <p className="text-sm text-muted-foreground">Remind about pending payments</p>
            </div>
            <Switch id="payment-reminders" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="large-transactions">Large Transactions</Label>
              <p className="text-sm text-muted-foreground">Alert for transactions above ₹10,000</p>
            </div>
            <Switch id="large-transactions" />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Data Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Download className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Export Data</h3>
                    <p className="text-sm text-muted-foreground">Download your data as Excel/PDF</p>
                  </div>
                </div>
                <Button className="w-full mt-3" variant="outline">
                  Export All Data
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Upload className="w-8 h-8 text-success" />
                  <div>
                    <h3 className="font-semibold">Import Data</h3>
                    <p className="text-sm text-muted-foreground">Import from Excel/CSV files</p>
                  </div>
                </div>
                <Button className="w-full mt-3" variant="outline">
                  Import Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <span>About Khata Pro</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Version</Label>
              <p className="text-sm text-muted-foreground">Khata Pro v1.0.0</p>
            </div>
            <div>
              <Label>Last Updated</Label>
              <p className="text-sm text-muted-foreground">December 2024</p>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-sm text-muted-foreground">
            Khata Pro is a comprehensive digital ledger system designed to help businesses 
            manage their customer accounts, track transactions, and generate insightful reports 
            with ease and precision.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const weeklyData = [
  { day: "Mon", credit: 12000, debit: 8000 },
  { day: "Tue", credit: 15000, debit: 12000 },
  { day: "Wed", credit: 8000, debit: 6000 },
  { day: "Thu", credit: 18000, debit: 14000 },
  { day: "Fri", credit: 22000, debit: 16000 },
  { day: "Sat", credit: 25000, debit: 18000 },
  { day: "Sun", credit: 14000, debit: 10000 },
];

const balanceData = [
  { name: "Outstanding", value: 124500, color: "hsl(217, 91%, 60%)" },
  { name: "Received", value: 89200, color: "hsl(142, 76%, 36%)" },
  { name: "Pending", value: 35300, color: "hsl(43, 96%, 56%)" },
];

export function WeeklyTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Transaction Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="credit" 
                stroke="hsl(142, 76%, 36%)" 
                strokeWidth={3}
                dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 4 }}
                name="Credit"
              />
              <Line 
                type="monotone" 
                dataKey="debit" 
                stroke="hsl(0, 84%, 60%)" 
                strokeWidth={3}
                dot={{ fill: "hsl(0, 84%, 60%)", strokeWidth: 2, r: 4 }}
                name="Debit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function MonthlyComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Daily Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="credit" 
                fill="hsl(142, 76%, 36%)" 
                name="Credit"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="debit" 
                fill="hsl(0, 84%, 60%)" 
                name="Debit"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function BalanceBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Balance Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={balanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {balanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {balanceData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <div className="text-sm">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">₹{item.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
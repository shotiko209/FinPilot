
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Calendar, FileText } from 'lucide-react';

// Mock data for demo
const cashFlowData = [
  { month: 'Jan', income: 45000, expenses: 32000, net: 13000 },
  { month: 'Feb', income: 52000, expenses: 35000, net: 17000 },
  { month: 'Mar', income: 48000, expenses: 38000, net: 10000 },
  { month: 'Apr', income: 61000, expenses: 42000, net: 19000 },
  { month: 'May', income: 55000, expenses: 39000, net: 16000 },
  { month: 'Jun', income: 67000, expenses: 44000, net: 23000 },
];

const expenseBreakdown = [
  { name: 'Rent', value: 12000, color: '#8d2df2' },
  { name: 'Utilities', value: 3500, color: '#a855f7' },
  { name: 'Marketing', value: 8000, color: '#c084fc' },
  { name: 'Supplies', value: 4500, color: '#d8b4fe' },
  { name: 'Other', value: 6000, color: '#e9d5ff' },
];

const upcomingInvoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: 12500, dueDate: '2024-01-15', status: 'pending' },
  { id: 'INV-002', client: 'Tech Solutions', amount: 8750, dueDate: '2024-01-18', status: 'overdue' },
  { id: 'INV-003', client: 'Digital Agency', amount: 15000, dueDate: '2024-01-22', status: 'pending' },
];

const riskAlerts = [
  { type: 'warning', message: 'Cash flow may drop below $10k next month', severity: 'medium' },
  { type: 'info', message: 'Q1 tax payment due in 15 days', severity: 'low' },
  { type: 'danger', message: 'Invoice INV-002 is 5 days overdue', severity: 'high' },
];

export function Dashboard() {
  const totalRevenue = 348000;
  const monthlyProfit = 23000;
  const cashBalance = 87500;
  const unpaidInvoices = 36250;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="finpilot-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-finpilot-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-finpilot-success flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="finpilot-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-finpilot-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyProfit.toLocaleString()}</div>
            <p className="text-xs text-finpilot-success flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="finpilot-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cash Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-finpilot-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${cashBalance.toLocaleString()}</div>
            <p className="text-xs text-finpilot-warning flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="finpilot-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unpaid Invoices</CardTitle>
            <FileText className="h-4 w-4 text-finpilot-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${unpaidInvoices.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">3 invoices pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Trend */}
        <Card className="finpilot-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Cash Flow Trend</CardTitle>
            <p className="text-sm text-gray-600">Monthly income vs expenses</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#8d2df2" fill="#8d2df2" fillOpacity={0.3} />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                <Line type="monotone" dataKey="net" stroke="#10b981" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="finpilot-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Expense Breakdown</CardTitle>
            <p className="text-sm text-gray-600">Current month expenses by category</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Invoices */}
        <Card className="finpilot-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Invoices</CardTitle>
            <p className="text-sm text-gray-600">Invoices requiring attention</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{invoice.id}</span>
                      <Badge variant={invoice.status === 'overdue' ? 'destructive' : 'secondary'}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{invoice.client}</p>
                    <p className="text-xs text-gray-500">Due: {invoice.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Alerts */}
        <Card className="finpilot-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Risk Alerts</CardTitle>
            <p className="text-sm text-gray-600">Issues requiring your attention</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAlerts.map((alert, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                  alert.severity === 'high' ? 'bg-red-50 border border-red-200' :
                  alert.severity === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={
                        alert.severity === 'high' ? 'destructive' :
                        alert.severity === 'medium' ? 'secondary' :
                        'outline'
                      } className="text-xs">
                        {alert.severity} priority
                      </Badge>
                    </div>
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

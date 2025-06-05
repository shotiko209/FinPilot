
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Extended mock data for cash flow forecasting
const cashFlowForecast = [
  { month: 'Jan', actual: 23000, projected: null, confidence: 'high' },
  { month: 'Feb', actual: 17000, projected: null, confidence: 'high' },
  { month: 'Mar', actual: 19000, projected: null, confidence: 'high' },
  { month: 'Apr', actual: 21000, projected: null, confidence: 'high' },
  { month: 'May', actual: 16000, projected: null, confidence: 'high' },
  { month: 'Jun', actual: 23000, projected: null, confidence: 'high' },
  { month: 'Jul', actual: null, projected: 25000, confidence: 'high' },
  { month: 'Aug', actual: null, projected: 22000, confidence: 'medium' },
  { month: 'Sep', actual: null, projected: 28000, confidence: 'medium' },
  { month: 'Oct', actual: null, projected: 24000, confidence: 'low' },
  { month: 'Nov', actual: null, projected: 26000, confidence: 'low' },
  { month: 'Dec', actual: null, projected: 30000, confidence: 'low' },
];

const monthlyBreakdown = [
  { category: 'Revenue', jan: 45000, feb: 52000, mar: 48000, apr: 61000, may: 55000, jun: 67000 },
  { category: 'Fixed Costs', jan: -15000, feb: -15000, mar: -15000, apr: -15000, may: -15000, jun: -15000 },
  { category: 'Variable Costs', jan: -12000, feb: -18000, mar: -14000, apr: -25000, may: -22000, jun: -27000 },
  { category: 'Operating Expenses', jan: -5000, feb: -2000, mar: -9000, apr: -2000, may: -2000, jun: -2000 },
];

function CashFlowPage() {
  const currentCashPosition = 87500;
  const projectedNextMonth = 95200;
  const burnRate = 35000;
  const runwayMonths = Math.floor(currentCashPosition / burnRate);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Cash Flow Forecast</h1>
          <p className="text-gray-600">AI-powered cash flow predictions and insights.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="finpilot-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Cash Position</CardTitle>
              <DollarSign className="h-4 w-4 text-finpilot-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentCashPosition.toLocaleString()}</div>
              <p className="text-xs text-finpilot-success flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="finpilot-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Next Month Projection</CardTitle>
              <TrendingUp className="h-4 w-4 text-finpilot-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${projectedNextMonth.toLocaleString()}</div>
              <p className="text-xs text-finpilot-success flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.8% projected growth
              </p>
            </CardContent>
          </Card>

          <Card className="finpilot-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Burn Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-finpilot-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${burnRate.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Average monthly expenses</p>
            </CardContent>
          </Card>

          <Card className="finpilot-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cash Runway</CardTitle>
              <Calendar className="h-4 w-4 text-finpilot-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{runwayMonths} months</div>
              <p className="text-xs text-finpilot-warning mt-1">At current burn rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Forecast Chart */}
        <Card className="finpilot-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">12-Month Cash Flow Forecast</CardTitle>
            <p className="text-sm text-gray-600">AI-powered predictions based on historical data and trends</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={cashFlowForecast}>
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
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8d2df2" 
                  strokeWidth={3} 
                  dot={{ fill: '#8d2df2', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#a855f7" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 3 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-finpilot-purple rounded-full"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-finpilot-purple-light"></div>
                <span className="text-sm text-gray-600">Projected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cash Flow Drivers */}
          <Card className="finpilot-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Cash Flow Drivers</CardTitle>
              <p className="text-sm text-gray-600">Key factors affecting your cash position</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900">Receivables Collection</div>
                    <div className="text-sm text-green-700">Average: 32 days</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Improving</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <div className="font-medium text-yellow-900">Inventory Turnover</div>
                    <div className="text-sm text-yellow-700">6.2x annually</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Monitor</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-900">Payment Terms</div>
                    <div className="text-sm text-blue-700">Net 30 days</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Optimize</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Analysis */}
          <Card className="finpilot-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Scenario Analysis</CardTitle>
              <p className="text-sm text-gray-600">What-if scenarios for planning</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Best Case (+20% revenue)</span>
                    <span className="text-green-600 font-semibold">$114k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Most Likely (current trend)</span>
                    <span className="text-finpilot-purple font-semibold">$95k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-finpilot-purple h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Worst Case (-15% revenue)</span>
                    <span className="text-red-600 font-semibold">$74k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default CashFlowPage;

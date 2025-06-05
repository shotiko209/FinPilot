
import { AlertTriangle, Shield, TrendingDown, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export function RiskAlerts() {
  const alerts = [
    {
      id: 1,
      type: 'high',
      title: 'Cash Flow Warning',
      description: 'Projected cash shortage in 2 weeks',
      date: '2025-01-15'
    },
    {
      id: 2,
      type: 'medium',
      title: 'Overdue Invoice',
      description: '3 invoices past due by 30+ days',
      date: '2025-01-14'
    },
    {
      id: 3,
      type: 'low',
      title: 'Tax Deadline Approaching',
      description: 'Quarterly tax payment due in 45 days',
      date: '2025-01-13'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Alerts</h1>
          <p className="text-gray-600 mt-2">Monitor potential financial risks and warnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            <Eye className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-muted-foreground">Monitor closely</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-muted-foreground">For awareness</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Current financial risks and warnings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${
              alert.type === 'high' ? 'border-l-red-500' :
              alert.type === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
            }`}>
              <AlertTriangle className={`h-4 w-4 ${
                alert.type === 'high' ? 'text-red-600' :
                alert.type === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`} />
              <AlertTitle className="flex items-center justify-between">
                <span>{alert.title}</span>
                <Badge variant={
                  alert.type === 'high' ? 'destructive' :
                  alert.type === 'medium' ? 'secondary' : 'outline'
                }>
                  {alert.type.toUpperCase()}
                </Badge>
              </AlertTitle>
              <AlertDescription>
                {alert.description}
                <div className="text-xs text-muted-foreground mt-1">
                  Alert created: {alert.date}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

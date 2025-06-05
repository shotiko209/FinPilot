import { useNavigate } from 'react-router-dom';
import { Calculator, FileText, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function TaxManager() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Manager</h1>
          <p className="text-gray-600 mt-2">Manage your tax obligations and calculations</p>
        </div>
        <Button className="flex items-center space-x-2">
          <FileText className="w-4 h-4" />
          <span>Generate Tax Report</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quarterly Tax Due</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,430</div>
            <p className="text-xs text-muted-foreground">Due March 15, 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Tax Estimate</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,250</div>
            <p className="text-xs text-muted-foreground">Based on current income</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deductions Available</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,540</div>
            <p className="text-xs text-muted-foreground">Business expenses YTD</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 days</div>
            <p className="text-xs text-muted-foreground">Q1 2025 payment</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Planning Tools</CardTitle>
          <CardDescription>Essential tools for managing your business taxes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/tax-calculator')}
            >
              <Calculator className="w-6 h-6" />
              <span>Tax Calculator</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/expense-tracker')}
            >
              <FileText className="w-6 h-6" />
              <span>Expense Tracker</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/tax-calendar')}
            >
              <Calendar className="w-6 h-6" />
              <span>Tax Calendar</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/payment-portal')}
            >
              <DollarSign className="w-6 h-6" />
              <span>Payment Portal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

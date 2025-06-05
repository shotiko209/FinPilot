
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign } from 'lucide-react';

export function TaxCalculator() {
  const [income, setIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState('');
  const [deductions, setDeductions] = useState('');
  const [taxOwed, setTaxOwed] = useState(0);

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    // Simplified tax calculation (2024 rates for single filer)
    let tax = 0;
    if (taxableIncome > 609350) {
      tax = 183647.25 + 0.37 * (taxableIncome - 609350);
    } else if (taxableIncome > 243725) {
      tax = 55678.50 + 0.35 * (taxableIncome - 243725);
    } else if (taxableIncome > 191950) {
      tax = 37104 + 0.32 * (taxableIncome - 191950);
    } else if (taxableIncome > 100525) {
      tax = 16290 + 0.24 * (taxableIncome - 100525);
    } else if (taxableIncome > 47150) {
      tax = 5426.25 + 0.22 * (taxableIncome - 47150);
    } else if (taxableIncome > 11000) {
      tax = 1100 + 0.12 * (taxableIncome - 11000);
    } else {
      tax = taxableIncome * 0.10;
    }
    
    setTaxOwed(Math.round(tax));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Calculator</h1>
          <p className="text-gray-600 mt-2">Calculate your estimated tax liability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-finpilot-purple" />
              <span>Tax Calculation</span>
            </CardTitle>
            <CardDescription>Enter your income and deduction details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="income">Annual Income</Label>
              <Input
                id="income"
                type="number"
                placeholder="100000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="filing-status">Filing Status</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select filing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                  <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                  <SelectItem value="head-of-household">Head of Household</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="deductions">Total Deductions</Label>
              <Input
                id="deductions"
                type="number"
                placeholder="15000"
                value={deductions}
                onChange={(e) => setDeductions(e.target.value)}
              />
            </div>

            <Button onClick={calculateTax} className="w-full finpilot-gradient">
              Calculate Tax
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Tax Results</span>
            </CardTitle>
            <CardDescription>Your estimated tax liability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${taxOwed.toLocaleString()}
              </div>
              <p className="text-gray-600">Estimated Tax Owed</p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Gross Income:</span>
                <span className="font-medium">${parseFloat(income || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Deductions:</span>
                <span className="font-medium">${parseFloat(deductions || '0').toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxable Income:</span>
                <span className="font-medium">${Math.max(0, parseFloat(income || '0') - parseFloat(deductions || '0')).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

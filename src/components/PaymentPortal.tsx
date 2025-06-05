
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, Clock, CheckCircle } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  date: string;
  type: string;
  status: 'completed' | 'pending' | 'scheduled';
  reference: string;
}

export function PaymentPortal() {
  const [payments] = useState<Payment[]>([
    {
      id: '1',
      amount: 12430,
      date: '2024-01-15',
      type: 'Q4 2023 Estimated Tax',
      status: 'completed',
      reference: 'TXN-2024-001'
    },
    {
      id: '2',
      amount: 15000,
      date: '2024-03-15',
      type: 'Q1 2024 Estimated Tax',
      status: 'scheduled',
      reference: 'TXN-2024-002'
    }
  ]);

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    type: '',
    date: '',
    account: ''
  });

  const paymentTypes = [
    'Quarterly Estimated Tax',
    'Annual Tax Payment',
    'Extension Payment',
    'Penalty Payment',
    'Interest Payment'
  ];

  const handleSubmitPayment = () => {
    console.log('Processing payment:', paymentForm);
    // In a real app, this would integrate with a payment processor
    alert('Payment submitted successfully! (Demo mode)');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'scheduled': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((sum, payment) => sum + payment.amount, 0);
  const totalScheduled = payments.filter(p => p.status === 'scheduled').reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Portal</h1>
          <p className="text-gray-600 mt-2">Make tax payments and manage payment history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">${totalScheduled.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Scheduled Payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{payments.length}</div>
            <p className="text-sm text-gray-600">Total Transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-finpilot-purple" />
              <span>Make Payment</span>
            </CardTitle>
            <CardDescription>Submit a new tax payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select value={paymentForm.type} onValueChange={(value) => setPaymentForm({...paymentForm, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment-amount">Amount</Label>
                <Input
                  id="payment-amount"
                  type="number"
                  placeholder="0.00"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="payment-date">Payment Date</Label>
                <Input
                  id="payment-date"
                  type="date"
                  value={paymentForm.date}
                  onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="account">Bank Account</Label>
              <Select value={paymentForm.account} onValueChange={(value) => setPaymentForm({...paymentForm, account: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking-1234">Business Checking ****1234</SelectItem>
                  <SelectItem value="savings-5678">Business Savings ****5678</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSubmitPayment} className="w-full finpilot-gradient">
              Submit Payment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span>Payment History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{payment.type}</div>
                    <div className="text-sm text-gray-600">Ref: {payment.reference}</div>
                    <div className="text-sm text-gray-600">{payment.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</div>
                    <Badge className={`inline-flex items-center space-x-1 ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="capitalize">{payment.status}</span>
                    </Badge>
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

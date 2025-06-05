import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Eye, Edit, Send, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  description: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-001',
    client: 'Acme Corp',
    amount: 12500,
    status: 'sent',
    issueDate: '2024-01-01',
    dueDate: '2024-01-15',
    description: 'Website Development Services'
  },
  {
    id: '2',
    number: 'INV-002',
    client: 'Tech Solutions',
    amount: 8750,
    status: 'overdue',
    issueDate: '2023-12-15',
    dueDate: '2024-01-18',
    description: 'Digital Marketing Campaign'
  },
  {
    id: '3',
    number: 'INV-003',
    client: 'Digital Agency',
    amount: 15000,
    status: 'paid',
    issueDate: '2024-01-05',
    dueDate: '2024-01-22',
    description: 'E-commerce Platform Development'
  },
  {
    id: '4',
    number: 'INV-004',
    client: 'StartupCo',
    amount: 5500,
    status: 'draft',
    issueDate: '2024-01-10',
    dueDate: '2024-01-25',
    description: 'Brand Identity Package'
  },
];

export function InvoiceManager() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'sent': return <Clock className="w-4 h-4" />;
      default: return <Edit className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50 border-green-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'sent': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);

  const addNewInvoice = (invoiceData: Omit<Invoice, 'id' | 'number'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: Date.now().toString(),
      number: `INV-${String(invoices.length + 1).padStart(3, '0')}`
    };
    
    setInvoices(prevInvoices => [...prevInvoices, newInvoice]);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
        <p className="text-gray-600">Create, track, and manage your invoices efficiently.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="finpilot-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total Invoiced</p>
          </CardContent>
        </Card>
        <Card className="finpilot-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Paid</p>
          </CardContent>
        </Card>
        <Card className="finpilot-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Overdue</p>
          </CardContent>
        </Card>
        <Card className="finpilot-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{invoices.length}</div>
            <p className="text-sm text-gray-600">Total Invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="finpilot-gradient">
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new invoice for your client.
              </DialogDescription>
            </DialogHeader>
            <CreateInvoiceForm onSubmit={addNewInvoice} onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Invoices List */}
      <Card className="finpilot-card">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <div className="font-medium text-gray-900">{invoice.number}</div>
                    <div className="text-sm text-gray-600">{invoice.client}</div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Amount</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-900">{invoice.issueDate}</div>
                    <div className="text-xs text-gray-600">Issue Date</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-900">{invoice.dueDate}</div>
                    <div className="text-xs text-gray-600">Due Date</div>
                  </div>
                  
                  <div>
                    <Badge className={`inline-flex items-center space-x-1 ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="capitalize">{invoice.status}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {invoice.status === 'draft' && (
                    <Button variant="ghost" size="sm" className="text-finpilot-purple">
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No invoices found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface CreateInvoiceFormProps {
  onSubmit: (invoiceData: Omit<Invoice, 'id' | 'number'>) => void;
  onClose: () => void;
}

function CreateInvoiceForm({ onSubmit, onClose }: CreateInvoiceFormProps) {
  const [formData, setFormData] = useState({
    client: '',
    amount: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    description: '',
    status: 'draft' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client || !formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Calculate due date if not provided (30 days from issue date)
    const dueDate = formData.dueDate || 
      new Date(new Date(formData.issueDate).getTime() + 30 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0];

    onSubmit({
      client: formData.client,
      amount: parseFloat(formData.amount),
      issueDate: formData.issueDate,
      dueDate: dueDate,
      description: formData.description,
      status: formData.status
    });

    // Reset form
    setFormData({
      client: '',
      amount: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      description: '',
      status: 'draft'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client">Client Name *</Label>
          <Input 
            id="client" 
            placeholder="Enter client name" 
            value={formData.client}
            onChange={(e) => setFormData({...formData, client: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount *</Label>
          <Input 
            id="amount" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input 
            id="issueDate" 
            type="date" 
            value={formData.issueDate}
            onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input 
            id="dueDate" 
            type="date" 
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
          />
          <p className="text-xs text-gray-500 mt-1">Leave blank for 30 days from issue date</p>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea 
          id="description" 
          placeholder="Invoice description..." 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" className="finpilot-gradient">Create Invoice</Button>
      </div>
    </form>
  );
}

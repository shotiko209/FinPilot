
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface TaxEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'quarterly' | 'annual' | 'monthly' | 'deadline';
}

export function TaxCalendar() {
  const taxEvents: TaxEvent[] = [
    {
      id: '1',
      title: 'Q1 2025 Estimated Tax Payment',
      date: 'March 15, 2025',
      description: 'First quarter estimated tax payment due',
      priority: 'high',
      category: 'quarterly'
    },
    {
      id: '2',
      title: 'Annual Tax Return Filing',
      date: 'April 15, 2025',
      description: 'Individual tax return filing deadline',
      priority: 'high',
      category: 'annual'
    },
    {
      id: '3',
      title: 'Q2 2025 Estimated Tax Payment',
      date: 'June 15, 2025',
      description: 'Second quarter estimated tax payment due',
      priority: 'medium',
      category: 'quarterly'
    },
    {
      id: '4',
      title: 'Q3 2025 Estimated Tax Payment',
      date: 'September 15, 2025',
      description: 'Third quarter estimated tax payment due',
      priority: 'medium',
      category: 'quarterly'
    },
    {
      id: '5',
      title: 'Q4 2024 & Annual 2025 Payment',
      date: 'January 15, 2026',
      description: 'Fourth quarter and annual estimated tax payment',
      priority: 'high',
      category: 'quarterly'
    },
    {
      id: '6',
      title: 'Form 1099 Distribution',
      date: 'January 31, 2025',
      description: 'Distribute 1099 forms to contractors',
      priority: 'medium',
      category: 'annual'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'quarterly': return <Clock className="w-4 h-4" />;
      case 'annual': return <Calendar className="w-4 h-4" />;
      case 'deadline': return <AlertCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const upcomingEvents = taxEvents.filter(event => new Date(event.date) >= new Date()).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tax Calendar</h1>
          <p className="text-gray-600 mt-2">Stay on top of important tax deadlines and payments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span>Upcoming Deadlines</span>
          </CardTitle>
          <CardDescription>Don't miss these important tax dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`inline-flex items-center space-x-1 ${getPriorityColor(event.priority)}`}>
                    {getCategoryIcon(event.category)}
                    <span className="capitalize">{event.priority}</span>
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="text-sm font-medium text-finpilot-purple">{event.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-finpilot-purple" />
            <span>Full Tax Calendar</span>
          </CardTitle>
          <CardDescription>Complete overview of tax obligations for the year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taxEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getPriorityColor(event.priority)}`}>
                    {getCategoryIcon(event.category)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{event.date}</div>
                  <Badge className={`${getPriorityColor(event.priority)} text-xs`}>
                    {event.priority} priority
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

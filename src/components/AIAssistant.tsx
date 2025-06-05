
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Lightbulb, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickQuestions = [
  "How can I improve my cash flow?",
  "When should I pay quarterly taxes?",
  "What expenses can I deduct?",
  "How do I handle overdue invoices?",
  "Should I hire an accountant?",
];

const aiInsights = [
  {
    icon: TrendingUp,
    title: "Cash Flow Optimization",
    description: "Your cash flow is trending positive, but consider implementing 30-day payment terms to accelerate collections.",
    priority: "medium"
  },
  {
    icon: AlertCircle,
    title: "Tax Planning Alert",
    description: "Q1 estimated tax payment is due in 15 days. Based on your current income, you'll owe approximately $8,500.",
    priority: "high"
  },
  {
    icon: Lightbulb,
    title: "Expense Recommendation",
    description: "You can potentially save $1,200/month by switching to a digital marketing strategy instead of traditional advertising.",
    priority: "low"
  }
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hello! I'm your AI Financial Assistant powered by advanced analytics. I can help you with cash flow management, tax planning, expense optimization, and strategic financial decisions. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: ["Analyze my cash flow trends", "Optimize tax strategy", "Review expense patterns", "Forecast revenue"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('cash flow')) {
      return {
        content: "📊 **Cash Flow Analysis:** Based on your current data, your cash flow shows a positive trend with a 15% improvement over last quarter. Here are my recommendations:\n\n🎯 **Immediate Actions:**\n• Implement 15-30 day payment terms (currently 45 days)\n• Offer 2% early payment discount for 10-day settlements\n• Automate invoice reminders at 7, 14, and 30 days\n\n📈 **Strategic Improvements:**\n• Consider invoice factoring for immediate cash needs\n• Diversify revenue streams to reduce seasonal fluctuations\n• Build a 3-month cash reserve for stability",
        suggestions: ["Set up automated reminders", "Calculate factoring costs", "Review payment terms", "Analyze seasonal patterns"]
      };
    }
    
    if (input.includes('tax')) {
      return {
        content: "🧾 **Tax Strategy Insights:** Your tax situation requires attention to optimize savings and ensure compliance.\n\n⚠️ **Immediate Deadlines:**\n• Q1 2025 estimated payment: $8,500 due March 15th\n• Annual filing preparation should start February\n\n💰 **Tax Optimization Opportunities:**\n• Maximize business expense deductions (currently $8,540 YTD)\n• Consider equipment purchases before year-end for depreciation\n• Evaluate retirement contributions for tax benefits\n• Review quarterly payment timing for cash flow optimization",
        suggestions: ["Calculate quarterly payments", "Review deduction checklist", "Plan equipment purchases", "Explore retirement options"]
      };
    }
    
    if (input.includes('invoice') || input.includes('overdue')) {
      return {
        content: "📋 **Invoice Management Strategy:** You have $8,750 in overdue receivables that need immediate attention.\n\n🔄 **Recovery Process:**\n• **Day 1-30:** Automated friendly reminders\n• **Day 31-45:** Personal phone call (Tech Solutions is 5 days overdue - call today!)\n• **Day 46-60:** Formal demand letter with payment plan options\n• **Day 61+:** Collections agency or legal action consideration\n\n✨ **Prevention Strategies:**\n• Require deposits for large projects\n• Implement credit checks for new clients\n• Use late fees (1.5% monthly) as deterrent",
        suggestions: ["Call overdue clients", "Set up payment plans", "Review credit policies", "Calculate late fees"]
      };
    }
    
    if (input.includes('accountant') || input.includes('cpa')) {
      return {
        content: "👨‍💼 **CPA Recommendation Analysis:** With your $348k annual revenue, hiring a CPA is highly recommended.\n\n💼 **Benefits vs. Costs:**\n• **ROI:** CPAs typically save 2-3x their fee in tax optimization\n• **Time Savings:** 5+ hours/week freed up for business growth\n• **Risk Reduction:** Professional compliance reduces audit risk\n• **Strategic Advice:** Growth planning and tax strategy\n\n🎯 **When to Hire:**\n✅ Revenue >$100k (you qualify)\n✅ Complex transactions (multiple revenue streams)\n✅ Time constraint (>5 hrs/week on books)\n\n💰 **Expected Investment:** $3,000-5,000 annually for your business size",
        suggestions: ["Find local CPAs", "Compare service packages", "Calculate time savings", "Request consultations"]
      };
    }

    return {
      content: "🤖 I'm here to provide personalized financial guidance! I can analyze your specific situation and provide actionable insights for:\n\n📊 **Financial Analysis:**\n• Cash flow optimization\n• Revenue forecasting\n• Expense categorization\n• Profitability analysis\n\n🎯 **Strategic Planning:**\n• Tax strategy development\n• Growth planning\n• Risk assessment\n• Investment recommendations\n\nWhat specific area would you like me to dive deeper into?",
      suggestions: ["Analyze financial health", "Create growth plan", "Optimize expenses", "Plan for taxes"]
    };
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Financial Assistant</h1>
            <p className="text-gray-600">Powered by advanced analytics • Real-time insights • Personalized recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="finpilot-card h-[650px] flex flex-col shadow-lg border-2 border-purple-100">
            <CardHeader className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <MessageCircle className="w-5 h-5 text-finpilot-purple" />
                </div>
                <span>Intelligent Financial Chat</span>
                <Badge variant="secondary" className="ml-2">AI Powered</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-600' 
                          : 'bg-white border-2 border-purple-200'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-finpilot-purple" />
                        )}
                      </div>
                      <div className={`p-4 rounded-2xl shadow-sm ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white' 
                          : 'bg-white text-gray-900 border border-purple-100'
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                        {message.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="text-xs h-7 px-3 bg-white/90 hover:bg-white text-gray-700 border border-purple-200 rounded-full shadow-sm hover:shadow-md transition-all"
                                onClick={() => handleSendMessage(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white border-2 border-purple-200 rounded-full flex items-center justify-center shadow-md">
                        <Bot className="w-5 h-5 text-finpilot-purple" />
                      </div>
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-purple-100">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enhanced Input */}
              <div className="border-t border-purple-100 p-4 bg-white">
                <div className="flex space-x-3">
                  <Input
                    placeholder="Ask me anything about your finances..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    className="flex-1 border-purple-200 focus:border-purple-400 rounded-full px-4"
                  />
                  <Button 
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="finpilot-gradient rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card className="finpilot-card shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <span>Quick Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 text-sm text-gray-600 hover:text-finpilot-purple hover:bg-purple-50 rounded-lg transition-all"
                  onClick={() => handleQuickQuestion(question)}
                >
                  <span className="text-purple-400 mr-2">•</span>
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced AI Insights */}
          <Card className="finpilot-card shadow-lg border-purple-100">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg shadow-sm ${
                      insight.priority === 'high' ? 'bg-red-100 border border-red-200' :
                      insight.priority === 'medium' ? 'bg-yellow-100 border border-yellow-200' :
                      'bg-blue-100 border border-blue-200'
                    }`}>
                      <insight.icon className={`w-4 h-4 ${
                        insight.priority === 'high' ? 'text-red-600' :
                        insight.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{insight.description}</p>
                      <Badge 
                        variant={insight.priority === 'high' ? 'destructive' : 'secondary'} 
                        className="mt-2 text-xs shadow-sm"
                      >
                        {insight.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

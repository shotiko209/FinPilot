
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CashFlowPage from "./pages/CashFlowPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import InvoicesPage from "./pages/InvoicesPage";
import TaxManagerPage from "./pages/TaxManagerPage";
import TaxCalculatorPage from "./pages/TaxCalculatorPage";
import ExpenseTrackerPage from "./pages/ExpenseTrackerPage";
import TaxCalendarPage from "./pages/TaxCalendarPage";
import PaymentPortalPage from "./pages/PaymentPortalPage";
import RiskAlertsPage from "./pages/RiskAlertsPage";
import ReportsPage from "./pages/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cash-flow" element={<CashFlowPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/tax-manager" element={<TaxManagerPage />} />
          <Route path="/tax-calculator" element={<TaxCalculatorPage />} />
          <Route path="/expense-tracker" element={<ExpenseTrackerPage />} />
          <Route path="/tax-calendar" element={<TaxCalendarPage />} />
          <Route path="/payment-portal" element={<PaymentPortalPage />} />
          <Route path="/risk-alerts" element={<RiskAlertsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

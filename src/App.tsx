import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import WhatsAppConnection from "./pages/dashboard/WhatsAppConnection";
import BotMarketplace from "./pages/dashboard/BotMarketplace";
import BotConfig from "./pages/dashboard/BotConfig";
import AISettings from "./pages/dashboard/AISettings";
import LiveChat from "./pages/dashboard/LiveChat";
import Orders from "./pages/dashboard/Orders";
import Appointments from "./pages/dashboard/Appointments";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="whatsapp" element={<WhatsAppConnection />} />
            <Route path="marketplace" element={<BotMarketplace />} />
            <Route path="bot-config" element={<BotConfig />} />
            <Route path="ai-settings" element={<AISettings />} />
            <Route path="chat" element={<LiveChat />} />
            <Route path="orders" element={<Orders />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

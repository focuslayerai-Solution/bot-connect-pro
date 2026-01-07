import { useMemo } from "react";
import { BarChart3, TrendingUp, MessageSquare, ShoppingCart, Calendar, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMessages, useMessageStats } from "@/hooks/useMessages";
import { useOrders, useOrderStats } from "@/hooks/useOrders";
import { useAppointments, useAppointmentStats } from "@/hooks/useAppointments";
import { format, subDays, startOfDay, isSameDay } from "date-fns";

export default function Analytics() {
  const { data: messages = [] } = useMessages();
  const { data: orders = [] } = useOrders();
  const { data: appointments = [] } = useAppointments();
  const messageStats = useMessageStats();
  const orderStats = useOrderStats();
  const appointmentStats = useAppointmentStats();

  // Calculate messages per day for the last 7 days
  const messagesData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const count = messages.filter((m) => isSameDay(new Date(m.created_at), dayStart)).length;
      days.push({ date: format(date, "EEE"), messages: count });
    }
    return days;
  }, [messages]);

  // Calculate orders per day
  const ordersData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const count = orders.filter((o) => isSameDay(new Date(o.created_at), dayStart)).length;
      days.push({ date: format(date, "EEE"), orders: count });
    }
    return days;
  }, [orders]);

  // Calculate appointments per day
  const appointmentsData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const count = appointments.filter((a) => isSameDay(new Date(a.scheduled_at), dayStart)).length;
      days.push({ date: format(date, "EEE"), appointments: count });
    }
    return days;
  }, [appointments]);

  // Calculate AI vs Static responses
  const aiVsStaticData = useMemo(() => {
    const botMessages = messages.filter((m) => m.direction === "outbound");
    // For now, assume all outbound messages are from bot (static)
    // This would need AI tracking in the message source
    return [
      { name: "Bot Responses", value: botMessages.length, color: "hsl(142, 70%, 45%)" },
      { name: "Human Messages", value: messages.filter((m) => m.direction === "inbound").length, color: "hsl(210, 20%, 80%)" },
    ];
  }, [messages]);

  const totalWeekMessages = messagesData.reduce((acc, d) => acc + d.messages, 0);
  const totalWeekOrders = ordersData.reduce((acc, d) => acc + d.orders, 0);
  const totalWeekAppointments = appointmentsData.reduce((acc, d) => acc + d.appointments, 0);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <BarChart3 className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="page-title">Analytics</h1>
            <p className="page-description">Track your bot's performance and engagement</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Messages"
          value={String(totalWeekMessages)}
          description="This week"
          icon={MessageSquare}
          trend={{ value: messageStats.today, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value={String(totalWeekOrders)}
          description="This week"
          icon={ShoppingCart}
          trend={{ value: orderStats.today, isPositive: true }}
        />
        <StatCard
          title="Appointments"
          value={String(totalWeekAppointments)}
          description="This week"
          icon={Calendar}
          trend={{ value: appointmentStats.today, isPositive: true }}
        />
        <StatCard
          title="Response Rate"
          value={messages.length > 0 ? `${Math.round((messages.filter(m => m.direction === 'outbound').length / Math.max(messages.filter(m => m.direction === 'inbound').length, 1)) * 100)}%` : "0%"}
          description="Bot responses"
          icon={TrendingUp}
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Messages Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Messages per Day
            </CardTitle>
            <CardDescription>Daily message volume this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={messagesData}>
                  <defs>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="hsl(142, 70%, 45%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorMessages)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              Orders per Day
            </CardTitle>
            <CardDescription>Daily orders received this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="orders" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Appointments per Day
            </CardTitle>
            <CardDescription>Daily appointments booked this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={appointmentsData}>
                  <defs>
                    <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="appointments"
                    stroke="hsl(199, 89%, 48%)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorAppointments)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bot vs Human */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Message Direction
            </CardTitle>
            <CardDescription>Inbound vs Outbound messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aiVsStaticData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {aiVsStaticData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              {aiVsStaticData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

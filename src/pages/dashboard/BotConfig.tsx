import { useState, useEffect } from "react";
import { Bot, Save, MessageSquare, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/status-badge";
import { useBotConfig, useUpdateBotConfig } from "@/hooks/useBotConfig";
import { toast } from "sonner";

export default function BotConfig() {
  const { data: botConfig, isLoading } = useBotConfig();
  const updateBotConfig = useUpdateBotConfig();

  const [greeting, setGreeting] = useState("Welcome to our business! How can I help you today?");
  const [faqAnswers, setFaqAnswers] = useState("");
  const [orderEnabled, setOrderEnabled] = useState(false);
  const [appointmentEnabled, setAppointmentEnabled] = useState(false);

  useEffect(() => {
    if (botConfig) {
      setGreeting(botConfig.greeting_message || "Welcome to our business! How can I help you today?");
      setOrderEnabled(botConfig.order_enabled || false);
      setAppointmentEnabled(botConfig.appointment_enabled || false);
      if (botConfig.static_replies && Array.isArray(botConfig.static_replies)) {
        const faqText = botConfig.static_replies
          .map((r: { question: string; answer: string }) => `Q: ${r.question}\nA: ${r.answer}`)
          .join("\n\n");
        setFaqAnswers(faqText);
      }
    }
  }, [botConfig]);

  const handleSave = async () => {
    try {
      // Parse FAQ text into structured format
      const staticReplies: Array<{ question: string; answer: string }> = [];
      const faqParts = faqAnswers.split(/\n\n+/);
      faqParts.forEach((part) => {
        const lines = part.split("\n");
        const questionLine = lines.find((l) => l.startsWith("Q:"));
        const answerLine = lines.find((l) => l.startsWith("A:"));
        if (questionLine && answerLine) {
          staticReplies.push({
            question: questionLine.replace("Q:", "").trim(),
            answer: answerLine.replace("A:", "").trim(),
          });
        }
      });

      await updateBotConfig.mutateAsync({
        greeting_message: greeting,
        static_replies: staticReplies,
        order_enabled: orderEnabled,
        appointment_enabled: appointmentEnabled,
      });
      toast.success("Bot configuration saved!");
    } catch (error) {
      toast.error("Failed to save configuration");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const isActive = !!botConfig?.bot_id;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent p-2">
              <Bot className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="page-title">Bot Configuration</h1>
              <p className="page-description">Customize your bot's messages and behavior</p>
            </div>
          </div>
          <StatusBadge variant={isActive ? "active" : "inactive"}>
            {isActive ? "Active" : "No Bot Selected"}
          </StatusBadge>
        </div>
      </div>

      {!isActive && (
        <div className="mb-6 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3">
          <p className="text-sm text-warning">
            No bot selected. Visit the Bot Marketplace to choose a bot template first.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Bot Features */}
          <Card>
            <CardHeader>
              <CardTitle>Bot Features</CardTitle>
              <CardDescription>Enable or disable bot capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label className="text-base">Order Taking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow bot to take and process orders
                  </p>
                </div>
                <Switch
                  checked={orderEnabled}
                  onCheckedChange={setOrderEnabled}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label className="text-base">Appointment Booking</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow bot to schedule appointments
                  </p>
                </div>
                <Switch
                  checked={appointmentEnabled}
                  onCheckedChange={setAppointmentEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Bot Messages</CardTitle>
              <CardDescription>Customize what your bot says</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Welcome message for new conversations..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq">FAQ Answers</Label>
                <Textarea
                  id="faq"
                  value={faqAnswers}
                  onChange={(e) => setFaqAnswers(e.target.value)}
                  placeholder="Q: Question?&#10;A: Answer...&#10;&#10;Q: Another question?&#10;A: Another answer..."
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  Format: Q: Question? followed by A: Answer on the next line. Separate pairs with blank lines.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={updateBotConfig.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {updateBotConfig.isPending ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Live Preview
              </CardTitle>
              <CardDescription>See how your bot will respond</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-secondary/50 p-4">
                {/* Simulated chat */}
                <div className="space-y-3">
                  <div className="flex items-end justify-end">
                    <div className="chat-bubble-incoming max-w-[80%]">
                      <p className="text-sm">Hi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                      <MessageSquare className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <div className="chat-bubble-outgoing max-w-[80%]">
                      <p className="text-sm">{greeting}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                This is a preview of how your bot will respond to customers
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

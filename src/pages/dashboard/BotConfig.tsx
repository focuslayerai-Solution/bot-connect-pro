import { useState } from "react";
import { Bot, Save, MessageSquare, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/status-badge";

interface BotConfig {
  greeting: string;
  businessName: string;
  businessDescription: string;
  workingHours: string;
  faqAnswers: string;
  menuServices: string;
  isActive: boolean;
}

export default function BotConfig() {
  const [config, setConfig] = useState<BotConfig>({
    greeting: "Welcome to our business! How can I help you today?",
    businessName: "My Business",
    businessDescription: "We provide excellent services to our customers.",
    workingHours: "Monday - Friday: 9 AM - 6 PM\nSaturday: 10 AM - 4 PM\nSunday: Closed",
    faqAnswers: "Q: What are your hours?\nA: We're open Mon-Fri 9-6, Sat 10-4.\n\nQ: Do you deliver?\nA: Yes, we offer delivery within 5km radius.",
    menuServices: "Service 1 - $25\nService 2 - $50\nService 3 - $75",
    isActive: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const updateConfig = (key: keyof BotConfig, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

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
          <StatusBadge variant={config.isActive ? "active" : "inactive"}>
            {config.isActive ? "Active" : "Inactive"}
          </StatusBadge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Bot Status */}
          <Card>
            <CardHeader>
              <CardTitle>Bot Status</CardTitle>
              <CardDescription>Enable or disable your bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Activate Bot</Label>
                  <p className="text-sm text-muted-foreground">
                    When active, the bot will automatically respond to messages
                  </p>
                </div>
                <Switch
                  checked={config.isActive}
                  onCheckedChange={(checked) => updateConfig("isActive", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Info */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Basic information about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={config.businessName}
                    onChange={(e) => updateConfig("businessName", e.target.value)}
                    placeholder="Your Business Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    value={config.workingHours.split("\n")[0]}
                    onChange={(e) => updateConfig("workingHours", e.target.value)}
                    placeholder="Mon-Fri: 9 AM - 6 PM"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={config.businessDescription}
                  onChange={(e) => updateConfig("businessDescription", e.target.value)}
                  placeholder="Describe your business..."
                  rows={3}
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
                  value={config.greeting}
                  onChange={(e) => updateConfig("greeting", e.target.value)}
                  placeholder="Welcome message for new conversations..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq">FAQ Answers</Label>
                <Textarea
                  id="faq"
                  value={config.faqAnswers}
                  onChange={(e) => updateConfig("faqAnswers", e.target.value)}
                  placeholder="Q: Question?\nA: Answer..."
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Format: Q: Question? followed by A: Answer on the next line
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu">Menu / Services List</Label>
                <Textarea
                  id="menu"
                  value={config.menuServices}
                  onChange={(e) => updateConfig("menuServices", e.target.value)}
                  placeholder="Item 1 - $10&#10;Item 2 - $20"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Configuration"}
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
                      <p className="text-sm">{config.greeting}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <div className="chat-bubble-incoming max-w-[80%]">
                      <p className="text-sm">What are your hours?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                      <MessageSquare className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <div className="chat-bubble-outgoing max-w-[80%]">
                      <p className="text-sm whitespace-pre-line">{config.workingHours}</p>
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

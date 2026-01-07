import { useState, useEffect } from "react";
import { Sparkles, Info, Save, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { useAISettings, useUpdateAISettings } from "@/hooks/useAISettings";
import { toast } from "sonner";

export default function AISettings() {
  const { data: aiSettings, isLoading } = useAISettings();
  const updateAISettings = useUpdateAISettings();

  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");

  useEffect(() => {
    if (aiSettings) {
      setIsAIEnabled(aiSettings.ai_enabled || false);
      setSystemPrompt(aiSettings.system_prompt || "");
    }
  }, [aiSettings]);

  const handleSave = async () => {
    try {
      await updateAISettings.mutateAsync({
        ai_enabled: isAIEnabled,
        system_prompt: systemPrompt || null,
      });
      toast.success("AI settings saved!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="page-title">AI Settings</h1>
            <p className="page-description">Configure AI-powered responses for your bot</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Mode</CardTitle>
                  <CardDescription>Enable intelligent responses powered by AI</CardDescription>
                </div>
                <StatusBadge variant={isAIEnabled ? "active" : "inactive"}>
                  {isAIEnabled ? "AI Enabled" : "Static Mode"}
                </StatusBadge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <Label className="text-base">Enable AI Responses</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, your bot will use AI for intelligent responses
                  </p>
                </div>
                <Switch
                  checked={isAIEnabled}
                  onCheckedChange={setIsAIEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
              <CardDescription>Customize how the AI responds to messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">AI Instructions</Label>
                <Textarea
                  id="systemPrompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="You are a helpful assistant for a business. Be friendly, professional, and helpful..."
                  rows={6}
                  disabled={!isAIEnabled}
                />
                <p className="text-xs text-muted-foreground">
                  This prompt tells the AI how to behave when responding to customers
                </p>
              </div>

              <div className="rounded-lg bg-accent/50 p-4">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 shrink-0 text-accent-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <p>
                      AI is processed by your n8n workflow. Make sure your workflow is configured
                      to handle AI responses when enabled.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSave}
                disabled={updateAISettings.isPending}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                {updateAISettings.isPending ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How AI Mode Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Customer sends message</p>
                    <p className="text-sm text-muted-foreground">
                      Message is received through WhatsApp via n8n
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">n8n checks AI setting</p>
                    <p className="text-sm text-muted-foreground">
                      Your workflow reads the ai_enabled flag from the database
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">AI generates response</p>
                    <p className="text-sm text-muted-foreground">
                      n8n uses the system prompt to generate contextual replies
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isAIEnabled && (
            <Card className="border-warning/50 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  Static Mode Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Without AI enabled, your bot will only respond with the pre-configured 
                  messages from your Bot Configuration. For more intelligent, contextual 
                  responses, enable AI mode above.
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>What AI mode enables</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Natural language understanding
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Context-aware responses
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Multilingual support
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Complex query handling
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Personalized recommendations
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

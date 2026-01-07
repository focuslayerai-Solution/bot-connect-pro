import { useState, useEffect, useRef } from "react";
import { Smartphone, CheckCircle2, AlertCircle, Save, ExternalLink, ArrowRight, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { useWhatsAppNumber, useUpdateWhatsAppNumber } from "@/hooks/useWhatsApp";
import { useBusiness } from "@/hooks/useBusiness";
import { toast } from "sonner";
import type { VerificationStatus } from "@/types/database";

export default function WhatsAppConnection() {
  const { data: whatsappNumber, isLoading } = useWhatsAppNumber();
  const { data: business } = useBusiness();
  const updateWhatsApp = useUpdateWhatsAppNumber();

  const [businessAccountId, setBusinessAccountId] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [metaSetupOpened, setMetaSetupOpened] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const businessIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (whatsappNumber) {
      setBusinessAccountId(whatsappNumber.business_account_id || "");
      setPhoneNumberId(whatsappNumber.phone_number_id || "");
      setDisplayPhoneNumber(whatsappNumber.display_phone_number || "");
      // Don't prefill access token for security - user must re-enter if updating
    }
  }, [whatsappNumber]);

  const verificationStatus: VerificationStatus = whatsappNumber?.verification_status || "not_connected";

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case "connected":
        return <StatusBadge variant="success">Connected</StatusBadge>;
      default:
        return <StatusBadge variant="error">Not Connected</StatusBadge>;
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "connected":
        return <CheckCircle2 className="h-12 w-12 text-success" />;
      default:
        return <AlertCircle className="h-12 w-12 text-destructive" />;
    }
  };

  const handleSave = async () => {
    if (!businessAccountId || !phoneNumberId || !accessToken) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!business?.id) {
      toast.error("Business not found. Please refresh the page.");
      return;
    }

    setIsSaving(true);
    try {
      await updateWhatsApp.mutateAsync({
        business_account_id: businessAccountId,
        phone_number_id: phoneNumberId,
        display_phone_number: displayPhoneNumber || null,
        access_token_encrypted: accessToken,
        verification_status: "connected",
      });

      toast.success("WhatsApp Connected!");
    } catch (error) {
      console.error("Failed to save configuration:", error);
      toast.error("Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenMetaSetup = () => {
    const width = 900;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      "https://developers.facebook.com/apps",
      "MetaWhatsAppSetup",
      `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
    );
    setMetaSetupOpened(true);
  };

  const handleCompletedSetup = () => {
    businessIdRef.current?.focus();
    toast.info("Please enter your Business Account ID and Phone Number ID below.");
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
        <h1 className="page-title">WhatsApp Connection</h1>
        <p className="page-description">Connect your WhatsApp Business account to start automating conversations.</p>
      </div>

      {/* Security Notice */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">Secure Token Handling</h3>
            <p className="text-sm text-muted-foreground mt-1">
              WhatsApp access tokens are securely managed by our backend (n8n). This dashboard only stores connection identifiers (Business Account ID and Phone Number ID). No sensitive tokens are stored in the frontend or database.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Connection Status
            </CardTitle>
            <CardDescription>Current status of your WhatsApp Business connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-6 text-center">
              {getStatusIcon()}
              <div className="mt-4">{getStatusBadge()}</div>
              <p className="mt-2 text-sm text-muted-foreground">
                {verificationStatus === "connected"
                  ? "WhatsApp Connected"
                  : "Enter your WhatsApp credentials to connect."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Meta Business Setup */}
        <Card>
          <CardHeader>
            <CardTitle>Meta Business Setup</CardTitle>
            <CardDescription>Configure your WhatsApp Cloud API in Meta Developer Console</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleOpenMetaSetup} className="w-full" size="lg">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Meta WhatsApp Setup
            </Button>
            
            {metaSetupOpened && (
              <>
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    Complete WhatsApp Cloud API setup in Meta. When finished, close the window and return here to paste your Business Account ID and Phone Number ID.
                  </p>
                </div>
                
                <Button 
                  onClick={handleCompletedSetup} 
                  variant="secondary" 
                  className="w-full"
                  size="lg"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  I've completed setup
                </Button>
              </>
            )}

            <div className="rounded-lg bg-accent/50 p-4">
              <h4 className="font-medium text-foreground">How it works</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Enter your credentials from Meta Business Manager</li>
                <li>• n8n receives WhatsApp webhooks securely</li>
                <li>• Messages are processed and stored automatically</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>WhatsApp Business IDs</CardTitle>
          <CardDescription>
            Enter your WhatsApp Business identifiers from the Meta Developer Console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessId">Business Account ID <span className="text-destructive">*</span></Label>
              <Input
                id="businessId"
                ref={businessIdRef}
                placeholder="Enter Business Account ID"
                value={businessAccountId}
                onChange={(e) => setBusinessAccountId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Your WhatsApp Business Account ID from Meta
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneId">Phone Number ID <span className="text-destructive">*</span></Label>
              <Input
                id="phoneId"
                placeholder="Enter Phone Number ID"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Found in your Meta Developer Console
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="accessToken">WhatsApp System User Access Token <span className="text-destructive">*</span></Label>
              <Input
                id="accessToken"
                type="password"
                placeholder="Enter your access token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Generate this token from Meta Business Manager → System Users → Generate Token (WhatsApp permissions)
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="displayPhone">Display Phone Number (optional)</Label>
              <Input
                id="displayPhone"
                placeholder="+1 234 567 8900"
                value={displayPhoneNumber}
                onChange={(e) => setDisplayPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The phone number shown to customers
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving || !businessAccountId || !phoneNumberId || !accessToken}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save & Connect"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

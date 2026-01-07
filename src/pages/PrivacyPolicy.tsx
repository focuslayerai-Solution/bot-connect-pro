import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-12 px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            We respect your privacy.
          </p>

          <p className="text-muted-foreground">
            This application uses the WhatsApp Business API to send and receive messages on behalf of businesses that connect their WhatsApp account.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data We Collect:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>WhatsApp phone numbers</li>
              <li>Message content sent and received through WhatsApp</li>
              <li>Business configuration data required to operate the service</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">How We Use Data:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>To deliver WhatsApp messages</li>
              <li>To automate replies and workflows</li>
              <li>To provide customer support features</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data Storage:</h2>
            <p className="text-muted-foreground">
              All data is stored securely and is not shared with third parties except where required to operate the WhatsApp Business API.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Data Deletion:</h2>
            <p className="text-muted-foreground">
              Users may request deletion of their data by contacting support.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

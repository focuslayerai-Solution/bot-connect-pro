import { Link } from "react-router-dom";
import { MessageSquare, Bot, BarChart3, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bot,
    title: "Pre-built Bots",
    description: "Ready-to-use bots for restaurants, salons, e-commerce, and more.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description: "Connect your WhatsApp Business account in minutes.",
  },
  {
    icon: ShoppingCart,
    title: "Order Management",
    description: "Track orders and appointments from a single dashboard.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Monitor performance with detailed insights and reports.",
  },
];

const benefits = [
  "24/7 automated customer support",
  "No coding required",
  "AI-powered responses with Gemini",
  "Multi-language support",
  "Order and appointment tracking",
  "Real-time analytics",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">BotFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Automate Your WhatsApp
              <span className="block text-primary">Business Conversations</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
              Deploy pre-built bots for your business in minutes. Handle orders, appointments, 
              and customer inquiries 24/7 with AI-powered responses.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Everything You Need</h2>
            <p className="mt-4 text-muted-foreground">
              A complete platform to automate your WhatsApp business
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Why Choose BotFlow?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Join hundreds of businesses automating their WhatsApp communications.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/signup">
                  <Button size="lg">Get Started Free</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <span className="text-xs">👋</span>
                    </div>
                    <div className="chat-bubble-incoming">
                      Hi! I'd like to make a reservation
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="chat-bubble-outgoing">
                      Hello! I'd be happy to help you with a reservation. For how many people and what date?
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <span className="text-xs">👋</span>
                    </div>
                    <div className="chat-bubble-incoming">
                      4 people, this Saturday at 7 PM
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="chat-bubble-outgoing">
                      Perfect! I've booked a table for 4 on Saturday at 7 PM. See you then! ✨
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Ready to Automate Your Business?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Start your 14-day free trial. No credit card required.
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MessageSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">BotFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 BotFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

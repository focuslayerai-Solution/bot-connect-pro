import { useState } from "react";
import { Store, Utensils, Scissors, ShoppingBag, HelpCircle, Check, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

interface Bot {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  useCase: string;
  exampleReplies: string[];
  features: string[];
}

const bots: Bot[] = [
  {
    id: "restaurant",
    name: "Restaurant Bot",
    description: "Perfect for restaurants, cafes, and food delivery services",
    icon: Utensils,
    useCase: "Handle menu inquiries, take orders, manage reservations",
    exampleReplies: [
      "Welcome! Would you like to see our menu or place an order?",
      "Great choice! Your order has been confirmed. Estimated delivery: 30 mins",
      "We have tables available at 7 PM and 8 PM. Which works for you?",
    ],
    features: ["Menu display", "Order taking", "Reservation booking", "Delivery tracking"],
  },
  {
    id: "salon",
    name: "Beauty Salon Bot",
    description: "Ideal for salons, spas, and beauty services",
    icon: Scissors,
    useCase: "Book appointments, show services, send reminders",
    exampleReplies: [
      "Hi! Ready to book your next appointment? Here are our available slots.",
      "Your haircut appointment is confirmed for Saturday at 2 PM!",
      "Reminder: Your spa session is tomorrow at 10 AM. See you then!",
    ],
    features: ["Appointment booking", "Service catalog", "Reminders", "Stylist selection"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Bot",
    description: "Built for online stores and product-based businesses",
    icon: ShoppingBag,
    useCase: "Product inquiries, order status, returns",
    exampleReplies: [
      "Looking for something specific? I can help you find the perfect product!",
      "Your order #12345 has been shipped! Track it here: [link]",
      "No problem! I'll start the return process for you. Please share the order number.",
    ],
    features: ["Product search", "Order tracking", "Returns handling", "Cart reminders"],
  },
  {
    id: "faq",
    name: "Generic FAQ Bot",
    description: "Universal bot for any business type",
    icon: HelpCircle,
    useCase: "Answer common questions, provide information",
    exampleReplies: [
      "Hi there! How can I help you today?",
      "Our business hours are Mon-Fri, 9 AM to 6 PM.",
      "You can reach us at support@example.com for detailed inquiries.",
    ],
    features: ["Custom FAQ", "Business info", "Contact routing", "Working hours"],
  },
];

export default function BotMarketplace() {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const [previewBot, setPreviewBot] = useState<Bot | null>(null);

  const handleSelectBot = (botId: string) => {
    setSelectedBot(botId);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <Store className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="page-title">Bot Marketplace</h1>
            <p className="page-description">Choose a pre-built bot template for your business</p>
          </div>
        </div>
      </div>

      {selectedBot && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3">
          <Check className="h-5 w-5 text-success" />
          <span className="text-sm font-medium text-success">
            {bots.find((b) => b.id === selectedBot)?.name} selected! Configure it in the Bot Config page.
          </span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {bots.map((bot) => {
          const Icon = bot.icon;
          const isSelected = selectedBot === bot.id;

          return (
            <Card
              key={bot.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => setPreviewBot(bot)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "rounded-lg p-2.5",
                      isSelected ? "bg-primary" : "bg-accent"
                    )}>
                      <Icon className={cn(
                        "h-5 w-5",
                        isSelected ? "text-primary-foreground" : "text-accent-foreground"
                      )} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                      <CardDescription className="mt-1">{bot.description}</CardDescription>
                    </div>
                  </div>
                  {isSelected && <StatusBadge variant="active">Active</StatusBadge>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Use Case</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{bot.useCase}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground">Features</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {bot.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={isSelected ? "outline" : "default"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBot(bot.id);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Selected
                      </>
                    ) : (
                      "Select This Bot"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewBot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm"
          onClick={() => setPreviewBot(null)}
        >
          <Card
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent p-2.5">
                  <previewBot.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle>{previewBot.name}</CardTitle>
                  <CardDescription>{previewBot.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-3 text-sm font-medium text-foreground">Example Conversations</h4>
                <div className="space-y-3 rounded-lg bg-secondary/50 p-4">
                  {previewBot.exampleReplies.map((reply, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                        <MessageSquare className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                      <div className="chat-bubble-outgoing flex-1">
                        <p className="text-sm">{reply}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPreviewBot(null)}
                >
                  Close
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    handleSelectBot(previewBot.id);
                    setPreviewBot(null);
                  }}
                >
                  Select This Bot
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

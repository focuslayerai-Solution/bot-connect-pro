import { useState } from "react";
import { MessageSquare, Search, Send, Bot, User, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "bot" | "customer";
  timestamp: string;
}

interface Conversation {
  id: string;
  customerName: string;
  phoneNumber: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: "bot" | "human";
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    customerName: "Maria Santos",
    phoneNumber: "+1 234 567 8901",
    lastMessage: "I'd like to book a table for 4",
    timestamp: "2 min ago",
    unread: 2,
    status: "bot",
    messages: [
      { id: "1", content: "Hi, I'd like to make a reservation", sender: "customer", timestamp: "10:30 AM" },
      { id: "2", content: "Hello Maria! I'd be happy to help you with a reservation. For how many people and when would you like to book?", sender: "bot", timestamp: "10:30 AM" },
      { id: "3", content: "I'd like to book a table for 4", sender: "customer", timestamp: "10:32 AM" },
      { id: "4", content: "Great! We have tables available for 4 people. What date and time works best for you?", sender: "bot", timestamp: "10:32 AM" },
    ],
  },
  {
    id: "2",
    customerName: "John Doe",
    phoneNumber: "+1 234 567 8902",
    lastMessage: "What time do you close?",
    timestamp: "15 min ago",
    unread: 0,
    status: "bot",
    messages: [
      { id: "1", content: "What time do you close?", sender: "customer", timestamp: "10:17 AM" },
      { id: "2", content: "We're open Monday to Friday from 9 AM to 6 PM, and Saturday from 10 AM to 4 PM. We're closed on Sundays.", sender: "bot", timestamp: "10:17 AM" },
    ],
  },
  {
    id: "3",
    customerName: "Sarah Wilson",
    phoneNumber: "+1 234 567 8903",
    lastMessage: "Thanks for the info!",
    timestamp: "1 hour ago",
    unread: 0,
    status: "bot",
    messages: [
      { id: "1", content: "Do you deliver?", sender: "customer", timestamp: "9:30 AM" },
      { id: "2", content: "Yes! We offer delivery within a 5km radius. Delivery is free for orders over $30. Would you like to place an order?", sender: "bot", timestamp: "9:30 AM" },
      { id: "3", content: "Thanks for the info!", sender: "customer", timestamp: "9:32 AM" },
    ],
  },
];

export default function LiveChat() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.phoneNumber.includes(searchQuery)
  );

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <MessageSquare className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="page-title">Live Chat</h1>
            <p className="page-description">Monitor and manage customer conversations</p>
          </div>
        </div>
      </div>

      <div className="grid h-[calc(100vh-12rem)] gap-4 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="flex flex-col lg:col-span-1">
          <CardHeader className="border-b pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-accent/50",
                  selectedConversation?.id === conv.id && "bg-accent"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {conv.customerName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{conv.customerName}</p>
                    <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StatusBadge variant={conv.status === "bot" ? "info" : "warning"} dot={false}>
                      {conv.status === "bot" ? "Bot" : "Human"}
                    </StatusBadge>
                    {conv.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-col lg:col-span-2">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {selectedConversation.customerName.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{selectedConversation.customerName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedConversation.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge variant="info">
                      <Bot className="mr-1 h-3 w-3" />
                      Bot Replying
                    </StatusBadge>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-end gap-2",
                        message.sender === "customer" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "bot" && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                          <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%]",
                          message.sender === "customer" ? "chat-bubble-incoming" : "chat-bubble-outgoing"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={cn(
                          "mt-1 text-[10px]",
                          message.sender === "customer" ? "text-muted-foreground" : "text-primary-foreground/70"
                        )}>
                          {message.timestamp}
                        </p>
                      </div>
                      {message.sender === "customer" && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                          <User className="h-3.5 w-3.5 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message... (Human takeover coming soon)"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled
                  />
                  <Button disabled>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Human takeover feature coming soon
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium text-foreground">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a conversation from the list to view messages
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

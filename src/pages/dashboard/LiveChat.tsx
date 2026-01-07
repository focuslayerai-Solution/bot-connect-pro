import { useState } from "react";
import { MessageSquare, Search, Send, Bot, User, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { useConversations, type Conversation } from "@/hooks/useMessages";
import { format } from "date-fns";

export default function LiveChat() {
  const { data: conversations = [], isLoading } = useConversations();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customerNumber.includes(searchQuery)
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return format(date, "h:mm a");
    return format(date, "MMM d");
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
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <button
                  key={conv.customerNumber}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-accent/50",
                    selectedConversation?.customerNumber === conv.customerNumber && "bg-accent"
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {conv.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{conv.customerNumber}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(conv.lastMessageTime)}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge variant={conv.source === "bot" ? "info" : "warning"} dot={false}>
                        {conv.source === "bot" ? "Bot" : "Human"}
                      </StatusBadge>
                      {conv.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
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
                      {selectedConversation.customerNumber.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{selectedConversation.customerNumber}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.messages.length} messages
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge variant="info">
                      <Bot className="mr-1 h-3 w-3" />
                      {selectedConversation.source === "bot" ? "Bot Replying" : "Human Replied"}
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
                        message.direction === "inbound" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.direction === "outbound" && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary">
                          <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%]",
                          message.direction === "inbound" ? "chat-bubble-incoming" : "chat-bubble-outgoing"
                        )}
                      >
                        <p className="text-sm">{message.message_text}</p>
                        <p className={cn(
                          "mt-1 text-[10px]",
                          message.direction === "inbound" ? "text-muted-foreground" : "text-primary-foreground/70"
                        )}>
                          {format(new Date(message.created_at), "h:mm a")}
                        </p>
                      </div>
                      {message.direction === "inbound" && (
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

import { ShoppingCart, Search, Filter, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  customer: string;
  phone: string;
  details: string;
  total: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Maria Santos",
    phone: "+1 234 567 8901",
    details: "2x Margherita Pizza, 1x Caesar Salad",
    total: "$45.00",
    status: "pending",
    createdAt: "2024-01-15 10:30 AM",
  },
  {
    id: "ORD-002",
    customer: "John Doe",
    phone: "+1 234 567 8902",
    details: "1x Pasta Carbonara, 2x Tiramisu",
    total: "$38.50",
    status: "accepted",
    createdAt: "2024-01-15 09:45 AM",
  },
  {
    id: "ORD-003",
    customer: "Sarah Wilson",
    phone: "+1 234 567 8903",
    details: "4x Garlic Bread, 2x Minestrone Soup",
    total: "$28.00",
    status: "completed",
    createdAt: "2024-01-15 08:20 AM",
  },
  {
    id: "ORD-004",
    customer: "Mike Johnson",
    phone: "+1 234 567 8904",
    details: "1x Family Combo, 2x Soft Drinks",
    total: "$65.00",
    status: "pending",
    createdAt: "2024-01-14 07:15 PM",
  },
  {
    id: "ORD-005",
    customer: "Emily Brown",
    phone: "+1 234 567 8905",
    details: "3x Bruschetta, 1x House Wine",
    total: "$42.00",
    status: "cancelled",
    createdAt: "2024-01-14 06:00 PM",
  },
];

const getStatusVariant = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "warning";
    case "accepted":
      return "info";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

export default function Orders() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <ShoppingCart className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="page-title">Orders</h1>
            <p className="page-description">Manage orders received through WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Accepted</p>
            <p className="text-2xl font-bold text-info">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-success">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search orders..." className="w-64 pl-9" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Order Details</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Created</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden max-w-xs truncate md:table-cell">
                    {order.details}
                  </TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <StatusBadge variant={getStatusVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {order.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Accept Order</DropdownMenuItem>
                        <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

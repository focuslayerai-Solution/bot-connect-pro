import { Calendar, Search, Filter, MoreHorizontal, Clock } from "lucide-react";
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

interface Appointment {
  id: string;
  customer: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: "upcoming" | "completed" | "cancelled" | "no_show";
}

const mockAppointments: Appointment[] = [
  {
    id: "APT-001",
    customer: "Lisa Anderson",
    phone: "+1 234 567 8901",
    date: "2024-01-16",
    time: "10:00 AM",
    service: "Haircut & Styling",
    status: "upcoming",
  },
  {
    id: "APT-002",
    customer: "Tom Williams",
    phone: "+1 234 567 8902",
    date: "2024-01-16",
    time: "11:30 AM",
    service: "Beard Trim",
    status: "upcoming",
  },
  {
    id: "APT-003",
    customer: "Emma Davis",
    phone: "+1 234 567 8903",
    date: "2024-01-16",
    time: "2:00 PM",
    service: "Hair Coloring",
    status: "upcoming",
  },
  {
    id: "APT-004",
    customer: "James Miller",
    phone: "+1 234 567 8904",
    date: "2024-01-15",
    time: "3:00 PM",
    service: "Haircut",
    status: "completed",
  },
  {
    id: "APT-005",
    customer: "Olivia Garcia",
    phone: "+1 234 567 8905",
    date: "2024-01-15",
    time: "4:30 PM",
    service: "Manicure & Pedicure",
    status: "no_show",
  },
];

const getStatusVariant = (status: Appointment["status"]) => {
  switch (status) {
    case "upcoming":
      return "info";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    case "no_show":
      return "warning";
    default:
      return "default";
  }
};

const getStatusLabel = (status: Appointment["status"]) => {
  switch (status) {
    case "no_show":
      return "No Show";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export default function Appointments() {
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <Calendar className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="page-title">Appointments</h1>
            <p className="page-description">Manage appointments booked through WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
            <p className="text-2xl font-bold text-foreground">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">This Week</p>
            <p className="text-2xl font-bold text-info">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-success">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-muted-foreground">No Shows</p>
            <p className="text-2xl font-bold text-warning">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Today */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Appointments scheduled for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAppointments
              .filter((apt) => apt.date === "2024-01-16")
              .map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                      <span className="text-sm font-medium text-accent-foreground">
                        {apt.time.split(" ")[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{apt.customer}</p>
                      <p className="text-sm text-muted-foreground">{apt.service}</p>
                    </div>
                  </div>
                  <StatusBadge variant={getStatusVariant(apt.status)}>
                    {getStatusLabel(apt.status)}
                  </StatusBadge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* All Appointments Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>View and manage all appointments</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search appointments..." className="w-64 pl-9" />
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
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="hidden md:table-cell">Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{apt.customer}</p>
                      <p className="text-sm text-muted-foreground">{apt.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell className="hidden md:table-cell">{apt.service}</TableCell>
                  <TableCell>
                    <StatusBadge variant={getStatusVariant(apt.status)}>
                      {getStatusLabel(apt.status)}
                    </StatusBadge>
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
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel
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

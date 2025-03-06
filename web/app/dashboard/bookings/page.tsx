"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardContainer } from "@/components/ui/dashboard-container";

// Mock data
const mockBookings = [
  {
    id: "B001",
    customer: "Emma Johnson",
    customerEmail: "emma.johnson@example.com",
    dress: "Elegant Evening Gown",
    dressId: "D001",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    status: "active",
    totalPrice: 250,
  },
  {
    id: "B002",
    customer: "Olivia Smith",
    customerEmail: "olivia.smith@example.com",
    dress: "Vintage Wedding Dress",
    dressId: "D005",
    startDate: "2024-03-15",
    endDate: "2024-03-16",
    status: "pending",
    totalPrice: 350,
  },
  {
    id: "B003",
    customer: "Sophia Williams",
    customerEmail: "sophia.williams@example.com",
    dress: "Cocktail Party Dress",
    dressId: "D010",
    startDate: "2024-03-20",
    endDate: "2024-03-21",
    status: "completed",
    totalPrice: 180,
  },
  {
    id: "B004",
    customer: "Isabella Brown",
    customerEmail: "isabella.brown@example.com",
    dress: "Summer Gala Dress",
    dressId: "D015",
    startDate: "2024-04-05",
    endDate: "2024-04-07",
    status: "cancelled",
    totalPrice: 220,
  },
  {
    id: "B005",
    customer: "Ava Jones",
    customerEmail: "ava.jones@example.com",
    dress: "Prom Night Special",
    dressId: "D020",
    startDate: "2024-04-10",
    endDate: "2024-04-11",
    status: "active",
    totalPrice: 200,
  },
];

const mockCustomers = [
  { id: "C001", name: "Emma Johnson", email: "emma.johnson@example.com" },
  { id: "C002", name: "Olivia Smith", email: "olivia.smith@example.com" },
  { id: "C003", name: "Sophia Williams", email: "sophia.williams@example.com" },
  { id: "C004", name: "Isabella Brown", email: "isabella.brown@example.com" },
  { id: "C005", name: "Ava Jones", email: "ava.jones@example.com" },
];

const mockDresses = [
  { id: "D001", name: "Elegant Evening Gown", price: 125, available: true },
  { id: "D005", name: "Vintage Wedding Dress", price: 350, available: true },
  { id: "D010", name: "Cocktail Party Dress", price: 90, available: true },
  { id: "D015", name: "Summer Gala Dress", price: 110, available: true },
  { id: "D020", name: "Prom Night Special", price: 100, available: true },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    customerId: "",
    dressId: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  // Filter bookings based on search term and active tab
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" || booking.status === activeTab;

    return matchesSearch && matchesTab;
  });

  const handleCreateBooking = () => {
    // In a real app, you would add the booking to the database
    console.log("Creating booking:", newBooking);
    setIsCreateBookingOpen(false);
    setNewBooking({
      customerId: "",
      dressId: "",
      startDate: undefined,
      endDate: undefined,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardContainer>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          <p className="text-muted-foreground">
            Manage your dress bookings
          </p>
        </div>
        <Dialog open={isCreateBookingOpen} onOpenChange={setIsCreateBookingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Booking</DialogTitle>
              <DialogDescription>
                Enter the details for the new dress booking.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer</Label>
                <Select
                  value={newBooking.customerId}
                  onValueChange={(value) =>
                    setNewBooking({ ...newBooking, customerId: value })
                  }
                >
                  <SelectTrigger id="customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} ({customer.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dress">Dress</Label>
                <Select
                  value={newBooking.dressId}
                  onValueChange={(value) =>
                    setNewBooking({ ...newBooking, dressId: value })
                  }
                >
                  <SelectTrigger id="dress">
                    <SelectValue placeholder="Select dress" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDresses.map((dress) => (
                      <SelectItem key={dress.id} value={dress.id}>
                        {dress.name} (${dress.price}/day)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newBooking.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newBooking.startDate ? (
                          format(newBooking.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newBooking.startDate}
                        onSelect={(date) =>
                          setNewBooking({ ...newBooking, startDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newBooking.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newBooking.endDate ? (
                          format(newBooking.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newBooking.endDate}
                        onSelect={(date) =>
                          setNewBooking({ ...newBooking, endDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateBookingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateBooking}>Create Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>
            View and manage all dress bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search bookings..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="all" className="mt-4">
                <BookingsTable
                  bookings={filteredBookings}
                  getStatusBadgeColor={getStatusBadgeColor}
                />
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <BookingsTable
                  bookings={filteredBookings}
                  getStatusBadgeColor={getStatusBadgeColor}
                />
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <BookingsTable
                  bookings={filteredBookings}
                  getStatusBadgeColor={getStatusBadgeColor}
                />
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <BookingsTable
                  bookings={filteredBookings}
                  getStatusBadgeColor={getStatusBadgeColor}
                />
              </TabsContent>
              <TabsContent value="cancelled" className="mt-4">
                <BookingsTable
                  bookings={filteredBookings}
                  getStatusBadgeColor={getStatusBadgeColor}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardContainer>
  );
}

interface BookingsTableProps {
  bookings: typeof mockBookings;
  getStatusBadgeColor: (status: string) => string;
}

function BookingsTable({ bookings, getStatusBadgeColor }: BookingsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Dress</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>
                <div>
                  <p>{booking.customer}</p>
                  <p className="text-xs text-muted-foreground">
                    {booking.customerEmail}
                  </p>
                </div>
              </TableCell>
              <TableCell>{booking.dress}</TableCell>
              <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
              <TableCell>${booking.totalPrice}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusBadgeColor(booking.status)}
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {bookings.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No bookings found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
} 
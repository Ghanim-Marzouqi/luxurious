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
  CardFooter,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Search, UserPlus, Edit, Trash2, Save } from "lucide-react";
import { DashboardContainer } from "@/components/ui/dashboard-container";

// Mock data
const mockUsers = [
  {
    id: "U001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-03-01T10:30:00Z",
  },
  {
    id: "U002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-03-02T14:15:00Z",
  },
  {
    id: "U003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "staff",
    status: "active",
    lastLogin: "2024-03-03T09:45:00Z",
  },
  {
    id: "U004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "staff",
    status: "inactive",
    lastLogin: "2024-02-15T11:20:00Z",
  },
];

const userRoles = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    companyName: "Luxurious Dress Rentals",
    contactEmail: "contact@luxurious.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Fashion Street, Style City, SC 12345",
    currency: "USD",
    taxRate: "8.5",
    enableNotifications: true,
    enableSMS: false,
    bookingLeadTime: "2",
    maxBookingDuration: "14",
    cancellationPeriod: "48",
    lateReturnFee: "25",
  });

  // Filter users based on search term
  const filteredUsers = mockUsers.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddUser = () => {
    // In a real app, you would add the user to the database
    console.log("Adding user:", newUser);
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleSaveSettings = () => {
    // In a real app, you would save the settings to the database
    console.log("Saving settings:", systemSettings);
    // Show success message
    alert("Settings saved successfully!");
  };

  return (
    <DashboardContainer>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultValue="users"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="booking">Booking Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account with specific role and permissions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) =>
                          setNewUser({ ...newUser, name: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                          setNewUser({ ...newUser, password: e.target.value })
                        }
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value) =>
                          setNewUser({ ...newUser, role: value })
                        }
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {userRoles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>Add User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {userRoles.find((r) => r.value === user.role)?.label || user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === "active" ? "default" : "secondary"}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastLogin).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your business information and general settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={systemSettings.companyName}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={systemSettings.contactEmail}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={systemSettings.contactPhone}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={systemSettings.address}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={systemSettings.currency}
                      onValueChange={(value) =>
                        setSystemSettings({
                          ...systemSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                        <SelectItem value="AUD">AUD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={systemSettings.taxRate}
                      onChange={(e) =>
                        setSystemSettings({
                          ...systemSettings,
                          taxRate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Booking Settings Tab */}
        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>
                Configure booking rules and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="bookingLeadTime">
                    Minimum Booking Lead Time (hours)
                  </Label>
                  <Input
                    id="bookingLeadTime"
                    type="number"
                    value={systemSettings.bookingLeadTime}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        bookingLeadTime: e.target.value,
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum time in advance a booking must be made
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxBookingDuration">
                    Maximum Booking Duration (days)
                  </Label>
                  <Input
                    id="maxBookingDuration"
                    type="number"
                    value={systemSettings.maxBookingDuration}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        maxBookingDuration: e.target.value,
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum number of days a dress can be booked
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cancellationPeriod">
                    Cancellation Period (hours)
                  </Label>
                  <Input
                    id="cancellationPeriod"
                    type="number"
                    value={systemSettings.cancellationPeriod}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        cancellationPeriod: e.target.value,
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Hours before booking start when cancellation is allowed
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lateReturnFee">
                    Late Return Fee (% of booking price per day)
                  </Label>
                  <Input
                    id="lateReturnFee"
                    type="number"
                    value={systemSettings.lateReturnFee}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        lateReturnFee: e.target.value,
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Fee charged for late returns as percentage of booking price
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for bookings and updates
                    </p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={systemSettings.enableNotifications}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        enableNotifications: checked,
                      })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableSMS">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS notifications for bookings and updates
                    </p>
                  </div>
                  <Switch
                    id="enableSMS"
                    checked={systemSettings.enableSMS}
                    onCheckedChange={(checked) =>
                      setSystemSettings({
                        ...systemSettings,
                        enableSMS: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  );
} 
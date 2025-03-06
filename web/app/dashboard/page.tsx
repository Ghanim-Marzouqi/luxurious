"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, ShoppingBag, Users } from "lucide-react";
import * as RechartsPrimitive from "recharts";
import * as Chart from "@/components/ui/chart";
import { DashboardContainer } from "@/components/ui/dashboard-container";

export default function DashboardPage() {
  // Mock data for the dashboard
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,345",
      description: "Last 30 days",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "+12.5%",
    },
    {
      title: "Active Bookings",
      value: "24",
      description: "Current bookings",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      change: "+5.2%",
    },
    {
      title: "Available Dresses",
      value: "156",
      description: "In inventory",
      icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
      change: "+2.1%",
    },
    {
      title: "Total Customers",
      value: "573",
      description: "Registered customers",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+18.7%",
    },
  ];

  // Mock data for the charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [3000, 4500, 3800, 5100, 6200, 5400],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        fill: true,
      },
    ],
  };

  const bookingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookings",
        data: [45, 52, 38, 64, 72, 58],
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary))",
        borderWidth: 1,
      },
    ],
  };

  // Convert data for Recharts
  const revenueChartData = revenueData.labels.map((month, index) => ({
    name: month,
    revenue: revenueData.datasets[0].data[index],
  }));

  const bookingsChartData = bookingsData.labels.map((month, index) => ({
    name: month,
    bookings: bookingsData.datasets[0].data[index],
  }));

  return (
    <DashboardContainer>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your dress booking business
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              {metric.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <div className="mt-2 text-xs font-medium text-green-600">
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Chart.ChartContainer className="h-[300px]" config={{ revenue: { color: "hsl(var(--primary))" } }}>
                  <RechartsPrimitive.LineChart data={revenueChartData}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey="name" />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip content={<Chart.ChartTooltipContent />} />
                    <RechartsPrimitive.Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </RechartsPrimitive.LineChart>
                </Chart.ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>
                  Monthly bookings for the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Chart.ChartContainer className="h-[300px]" config={{ bookings: { color: "hsl(var(--primary))" } }}>
                  <RechartsPrimitive.BarChart data={bookingsChartData}>
                    <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                    <RechartsPrimitive.XAxis dataKey="name" />
                    <RechartsPrimitive.YAxis />
                    <RechartsPrimitive.Tooltip content={<Chart.ChartTooltipContent />} />
                    <RechartsPrimitive.Bar
                      dataKey="bookings"
                      fill="var(--color-bookings)"
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsPrimitive.BarChart>
                </Chart.ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Detailed analysis of your business performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced analytics content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and view business reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Reports content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest dress bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Customer {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      Booked Dress #{Math.floor(Math.random() * 100)}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Dresses</CardTitle>
            <CardDescription>Most booked dresses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Dress #{i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      Booked {10 - i * 2} times this month
                    </p>
                  </div>
                  <div className="text-xs font-medium text-green-600">
                    +{(10 - i) * 5}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>New Customers</CardTitle>
            <CardDescription>Recently registered customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New Customer {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {i + 1} day{i > 0 ? "s" : ""} ago
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
} 
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Shirt,
  Settings,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Check if a route is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(path);
  };

  // If still loading or not authenticated, show nothing
  if (isLoading || !user) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar className="flex-shrink-0 z-20">
          <SidebarHeader className="p-4">
            <h2 className="text-xl font-bold">Luxurious</h2>
            <p className="text-sm text-muted-foreground">Dress Booking</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <Link href="/dashboard" passHref>
                <SidebarMenuButton
                  isActive={isActive('/dashboard')}
                  tooltip="Overview"
                  size="lg"
                >
                  <LayoutDashboard className="h-6 w-6" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </Link>
              <Link href="/dashboard/customers" passHref>
                <SidebarMenuButton
                  isActive={isActive('/dashboard/customers')}
                  tooltip="Customers"
                  size="lg"
                >
                  <Users className="h-6 w-6" />
                  <span>Customers</span>
                </SidebarMenuButton>
              </Link>
              <Link href="/dashboard/bookings" passHref>
                <SidebarMenuButton
                  isActive={isActive('/dashboard/bookings')}
                  tooltip="Bookings"
                  size="lg"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Bookings</span>
                </SidebarMenuButton>
              </Link>
              <Link href="/dashboard/dresses" passHref>
                <SidebarMenuButton
                  isActive={isActive('/dashboard/dresses')}
                  tooltip="Dresses"
                  size="lg"
                >
                  <Shirt className="h-6 w-6" />
                  <span>Dresses</span>
                </SidebarMenuButton>
              </Link>
              <Link href="/dashboard/settings" passHref>
                <SidebarMenuButton
                  isActive={isActive('/dashboard/settings')}
                  tooltip="Settings"
                  size="lg"
                >
                  <Settings className="h-6 w-6" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{user?.email || "randy.riley@gmail.com"}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <SidebarTrigger />
            </div>
            <h1 className="text-xl font-bold">Luxurious Dashboard</h1>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                title="Toggle Dark Mode"
                className="mr-2"
              >
                {darkMode ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full min-w-0 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
} 
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardContainer({
  children,
  className,
  ...props
}: DashboardContainerProps) {
  return (
    <div
      className={cn("space-y-6 w-full max-w-full flex-1 p-6 min-w-0", className)}
      {...props}
    >
      {children}
    </div>
  );
} 
// Adapted from shadcn/ui toast component
// https://ui.shadcn.com/docs/components/toast

import { useState, useEffect, useCallback } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
};

type Toast = ToastProps & {
  id: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ title, description, variant = "default", duration = 5000 }: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, title, description, variant, duration };
      
      setToasts((prevToasts) => [...prevToasts, newToast]);
      
      if (duration > 0) {
        setTimeout(() => {
          setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
        }, duration);
      }
      
      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return { toast, dismiss, toasts };
} 
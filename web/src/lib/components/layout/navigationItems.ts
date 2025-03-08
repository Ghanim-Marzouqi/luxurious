import { t } from '$lib/i18n';
import { get } from 'svelte/store';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  Shirt, 
  Settings 
} from 'lucide-svelte';
import type { SidebarNavItem } from '$lib/components/ui/sidebar';

// Get navigation items based on user role
export function getNavItems(role: string | undefined | null) {
  if (!role) return [];
  return role === 'admin' ? getAdminItems() : getStaffItems();
}

// Admin navigation items
export function getAdminItems(): SidebarNavItem[] {
  const $t = get(t);
  return [
    {
      title: $t('dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: $t('customers'),
      href: '/customers',
      icon: Users
    },
    {
      title: $t('bookings'),
      href: '/bookings',
      icon: CalendarClock
    },
    {
      title: $t('dresses'),
      href: '/dresses',
      icon: Shirt
    },
    {
      title: $t('settings'),
      href: '/settings',
      icon: Settings
    }
  ];
}

// Staff navigation items
export function getStaffItems(): SidebarNavItem[] {
  const $t = get(t);
  return [
    {
      title: $t('dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      title: $t('customers'),
      href: '/customers',
      icon: Users
    },
    {
      title: $t('bookings'),
      href: '/bookings',
      icon: CalendarClock
    },
    {
      title: $t('dresses'),
      href: '/dresses',
      icon: Shirt
    }
  ];
} 
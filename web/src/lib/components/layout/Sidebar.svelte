<script lang="ts">
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';
  import { auth } from '$lib/stores/auth';
  import { 
    Sidebar, 
    SidebarHeader, 
    SidebarContent, 
    SidebarFooter,
    SidebarNav,
    type SidebarNavItem
  } from '$lib/components/ui/sidebar';
  import { Button } from '$lib/components/ui/button';
  import { 
    ChevronLeft, 
    ChevronRight, 
    LayoutDashboard, 
    Users, 
    CalendarClock, 
    Shirt, 
    Settings 
  } from 'lucide-svelte';
  import type { User } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { getNavItems } from './navigationItems';
  import Copyright from './Copyright.svelte';
  
  const dispatch = createEventDispatcher();
  
  let { 
    user = null,
    open = true
  } = $props<{ 
    user?: User | null,
    open?: boolean
  }>();
  
  // Navigation items based on user role
  $effect(() => {
    user = $auth.user;
  });
  
  const adminItems: SidebarNavItem[] = [
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
  
  const staffItems: SidebarNavItem[] = [
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
  
  $effect(() => {
    // Update navigation items when language changes
    adminItems.forEach((item, index) => {
      adminItems[index].title = $t(item.title.toLowerCase());
    });
    
    staffItems.forEach((item, index) => {
      staffItems[index].title = $t(item.title.toLowerCase());
    });
  });
  
  function toggleSidebar() {
    open = !open;
    dispatch('toggle', { open });
  }
</script>

<Sidebar open={open}>
  <SidebarHeader>
    <div class="flex items-center justify-between">
      {#if open}
        <span class="font-bold text-xl text-primary">
          {$t('appName')}
        </span>
      {/if}
      <Button variant="ghost" size="icon" on:click={toggleSidebar}>
        {#if open}
          <ChevronLeft class="h-4 w-4" />
        {:else}
          <ChevronRight class="h-4 w-4" />
        {/if}
      </Button>
    </div>
  </SidebarHeader>
  
  <SidebarContent>
    <SidebarNav items={getNavItems(user?.role)} open={open} />
  </SidebarContent>
  
  <SidebarFooter>
    {#if open}
      <Copyright className="text-xs text-muted-foreground" showAllRights={false} />
    {/if}
  </SidebarFooter>
</Sidebar> 
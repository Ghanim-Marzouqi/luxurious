<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { formatCurrency } from '$lib/utils';
  import StatsCard from '$lib/components/dashboard/StatsCard.svelte';
  import RecentActivityCard from '$lib/components/dashboard/RecentActivityCard.svelte';
  import UpcomingBookingsCard from '$lib/components/dashboard/UpcomingBookingsCard.svelte';
  import { dashboardApi } from '$lib/services/api';
  import { toast } from 'svelte-sonner';
  import { Users, CalendarClock, Shirt, DollarSign } from 'lucide-svelte';
  import type { RecentActivity, Booking } from '$lib/types';
  
  // Dashboard data
  let stats = {
    activeBookings: 0,
    totalRevenue: 0,
    availableDresses: 0,
    totalCustomers: 0
  };
  
  let recentActivities: RecentActivity[] = [];
  let upcomingBookings: Booking[] = [];
  let isLoading = true;
  
  // Fetch dashboard data
  async function fetchDashboardData() {
    isLoading = true;
    
    try {
      // Fetch stats
      const statsResponse = await dashboardApi.getStats();
      if (statsResponse.data) {
        stats = statsResponse.data;
      }
      
      // Fetch recent activities
      const activitiesResponse = await dashboardApi.getRecentActivities();
      if (activitiesResponse.data) {
        recentActivities = activitiesResponse.data;
      }
      
      // Fetch upcoming bookings
      const bookingsResponse = await dashboardApi.getUpcomingBookings();
      if (bookingsResponse.data) {
        upcomingBookings = bookingsResponse.data;
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    fetchDashboardData();
  });
</script>

<div>
  <h1 class="text-3xl font-bold tracking-tight">{$t('dashboard')}</h1>
  <p class="text-muted-foreground">{$t('overview')}</p>
  
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <p>{$t('loading')}</p>
    </div>
  {:else}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <StatsCard 
        title={$t('activeBookings')} 
        value={stats.activeBookings.toString()} 
        icon={CalendarClock}
      />
      <StatsCard 
        title={$t('totalRevenue')} 
        value={formatCurrency(stats.totalRevenue)} 
        icon={DollarSign}
      />
      <StatsCard 
        title={$t('availableDresses')} 
        value={stats.availableDresses.toString()} 
        icon={Shirt}
      />
      <StatsCard 
        title={$t('totalCustomers')} 
        value={stats.totalCustomers.toString()} 
        icon={Users}
      />
    </div>
    
    <div class="grid gap-4 md:grid-cols-2 mt-6">
      <RecentActivityCard activities={recentActivities} />
      <UpcomingBookingsCard bookings={upcomingBookings} />
    </div>
  {/if}
</div> 
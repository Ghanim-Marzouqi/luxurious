<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { bookingsApi } from '$lib/services/api';
  import { toast } from 'svelte-sonner';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import { Badge } from '$lib/components/ui/badge';
  import { formatDate, formatCurrency, getStatusColor } from '$lib/utils';
  import type { Booking } from '$lib/types';
  import { Plus, Search, Filter } from 'lucide-svelte';
  
  let bookings: Booking[] = [];
  let isLoading = true;
  let searchQuery = '';
  
  // Fetch bookings
  async function fetchBookings() {
    isLoading = true;
    
    try {
      const response = await bookingsApi.getAll();
      if (response.data) {
        bookings = response.data;
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    fetchBookings();
  });
</script>

<div>
  <div class="flex justify-between items-center mb-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">{$t('bookings')}</h1>
      <p class="text-muted-foreground">{$t('bookingsList')}</p>
    </div>
    <Button>
      <Plus class="mr-2 h-4 w-4" />
      {$t('addBooking')}
    </Button>
  </div>
  
  <div class="flex items-center mb-6">
    <div class="relative w-full max-w-sm">
      <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={$t('search')}
        class="pl-8"
        bind:value={searchQuery}
      />
    </div>
    <Button variant="outline" class="ml-2">
      <Filter class="mr-2 h-4 w-4" />
      {$t('filter')}
    </Button>
  </div>
  
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <p>{$t('loading')}</p>
    </div>
  {:else if bookings.length === 0}
    <div class="flex justify-center items-center h-64 border rounded-lg">
      <div class="text-center">
        <p class="text-muted-foreground">{$t('noBookingsFound')}</p>
        <Button variant="outline" class="mt-4" on:click={fetchBookings}>
          {$t('refreshList')}
        </Button>
      </div>
    </div>
  {:else}
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{$t('customer')}</TableHead>
            <TableHead>{$t('dress')}</TableHead>
            <TableHead>{$t('dateRange')}</TableHead>
            <TableHead>{$t('totalPrice')}</TableHead>
            <TableHead>{$t('status')}</TableHead>
            <TableHead class="text-right">{$t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each bookings as booking}
            <TableRow>
              <TableCell class="font-medium">{booking.customer?.name || $t('unknownCustomer')}</TableCell>
              <TableCell>{booking.dress?.name || $t('unknownDress')}</TableCell>
              <TableCell>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</TableCell>
              <TableCell>{formatCurrency(booking.totalPrice)}</TableCell>
              <TableCell>
                <Badge class={getStatusColor(booking.status)}>
                  {$t(`bookingStatus.${booking.status}`)}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm">
                  {$t('view')}
                </Button>
              </TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  {/if}
</div> 
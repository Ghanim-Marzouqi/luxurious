<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { t } from '$lib/i18n';
  import type { Booking } from '$lib/types';
  import { formatDate, getStatusColor } from '$lib/utils';
  
  let { bookings = [] } = $props<{
    bookings: Booking[];
  }>();
</script>

<Card>
  <CardHeader>
    <CardTitle>{$t('upcomingBookings')}</CardTitle>
    <CardDescription>{$t('upcomingBookingsDescription')}</CardDescription>
  </CardHeader>
  <CardContent>
    {#if bookings.length === 0}
      <div class="text-center py-4 text-muted-foreground">
        {$t('noUpcomingBookings')}
      </div>
    {:else}
      <div class="space-y-4">
        {#each bookings as booking}
          <div class="flex items-center justify-between">
            <div class="space-y-1">
              <p class="text-sm font-medium leading-none">
                {booking.customer?.name || $t('unknownCustomer')}
              </p>
              <p class="text-sm text-muted-foreground">
                {booking.dress?.name || $t('unknownDress')}
              </p>
              <p class="text-xs text-muted-foreground">
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </p>
            </div>
            <Badge class={getStatusColor(booking.status)}>
              {$t(`bookingStatus.${booking.status}`)}
            </Badge>
          </div>
          {#if bookings.indexOf(booking) < bookings.length - 1}
            <hr class="my-2" />
          {/if}
        {/each}
      </div>
    {/if}
  </CardContent>
</Card> 
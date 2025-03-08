<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { t } from '$lib/i18n';
  import type { RecentActivity } from '$lib/types';
  import { formatDate } from '$lib/utils';
  
  let { activities = [] } = $props<{
    activities: RecentActivity[];
  }>();
  
  // Get icon based on activity type
  function getActivityIcon(type: RecentActivity['type']) {
    switch (type) {
      case 'booking':
        return 'calendar-clock';
      case 'customer':
        return 'user';
      case 'dress':
        return 'shirt';
      default:
        return 'activity';
    }
  }
  
  // Get color based on activity action
  function getActivityColor(action: RecentActivity['action']) {
    switch (action) {
      case 'created':
        return 'text-green-500';
      case 'updated':
        return 'text-blue-500';
      case 'deleted':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
</script>

<Card>
  <CardHeader>
    <CardTitle>{$t('recentActivity')}</CardTitle>
    <CardDescription>{$t('recentActivityDescription')}</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="space-y-8">
      {#if activities.length === 0}
        <div class="text-center py-4 text-muted-foreground">
          {$t('noRecentActivity')}
        </div>
      {:else}
        {#each activities as activity}
          <div class="flex items-center">
            <div class="mr-4 rounded-full p-2 bg-muted">
              <span class="material-icons text-primary text-lg">
                {getActivityIcon(activity.type)}
              </span>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium leading-none">
                {activity.entityName}
                <span class={getActivityColor(activity.action)}>
                  {$t(activity.action)}
                </span>
              </p>
              <p class="text-sm text-muted-foreground">
                {$t('by')} {activity.performedBy} • {formatDate(activity.timestamp)}
              </p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </CardContent>
</Card> 
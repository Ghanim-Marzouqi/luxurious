<script lang="ts">
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  import { t } from '$lib/i18n';
  import { auth } from '$lib/stores/auth';
  import type { User } from '$lib/types';
  import { getNavItems } from './navigationItems';
  
  let { user = null } = $props<{ user?: User | null }>();
  
  // Navigation items based on user role
  $effect(() => {
    user = $auth.user;
  });
</script>

<nav class="flex items-center space-x-4 lg:space-x-6">
  {#each getNavItems(user?.role) as item}
    <a
      href={item.href}
      class={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        $page.url.pathname === item.href
          ? "text-primary"
          : "text-muted-foreground"
      )}
    >
      {item.title}
    </a>
  {/each}
</nav> 
<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from '$lib/components/ui/dropdown-menu';
  import { auth } from '$lib/stores/auth';
  import { t } from '$lib/i18n';
  import { getInitials } from '$lib/utils';
  import { goto } from '$app/navigation';
  import type { User } from '$lib/types';
  
  let { user = null } = $props<{ user?: User | null }>();
  
  function handleLogout() {
    auth.logout();
    goto('/auth/login');
  }
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button variant="ghost" class="relative h-8 w-8 rounded-full" builders={[builder]}>
      <Avatar class="h-8 w-8">
        <AvatarImage src="" alt={user?.name || ''} />
        <AvatarFallback>{user ? getInitials(user.name) : ''}</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56" align="end">
    <DropdownMenuLabel class="font-normal">
      <div class="flex flex-col space-y-1">
        <p class="text-sm font-medium leading-none">{user?.name}</p>
        <p class="text-xs leading-none text-muted-foreground">
          {user?.email}
        </p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem on:click={() => goto('/settings/profile')}>
        {$t('profile')}
      </DropdownMenuItem>
      {#if user?.role === 'admin'}
        <DropdownMenuItem on:click={() => goto('/settings')}>
          {$t('settings')}
        </DropdownMenuItem>
      {/if}
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem on:click={handleLogout}>
      {$t('logout')}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> 
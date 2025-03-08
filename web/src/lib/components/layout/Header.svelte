<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { t } from '$lib/i18n';
  import ThemeToggle from './ThemeToggle.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import UserAccountNav from './UserAccountNav.svelte';
  import { Button } from '$lib/components/ui/button';
  import { goto } from '$app/navigation';
</script>

<header class="sticky top-0 z-40 w-full border-b bg-background">
  <div class="container flex h-16 items-center">
    <div class="flex items-center space-x-4">
      {#if !$auth.isAuthenticated}
        <a href="/" class="flex items-center space-x-2">
          <span class="font-bold text-xl text-primary">
            {$t('appName')}
          </span>
        </a>
      {/if}
    </div>
    <div class="flex flex-1 items-center justify-end space-x-4">
      <nav class="flex items-center space-x-2">
        <ThemeToggle />
        <LanguageSwitcher />
        
        {#if $auth.isAuthenticated}
          <UserAccountNav user={$auth.user} />
        {:else}
          <Button variant="outline" on:click={() => goto('/auth/login')}>
            {$t('login')}
          </Button>
        {/if}
      </nav>
    </div>
  </div>
</header> 
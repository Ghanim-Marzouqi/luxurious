<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { Button } from '$lib/components/ui/button';
  
  onMount(async () => {
    await auth.checkAuth();
    
    if ($auth.isAuthenticated) {
      goto('/dashboard');
    }
  });
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center px-4">
  <h1 class="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
    {$t('appName')}
  </h1>
  <p class="mt-4 text-xl text-muted-foreground max-w-2xl">
    {$t('appDescription')}
  </p>
  <div class="mt-8 flex flex-col sm:flex-row gap-4">
    <Button on:click={() => goto('/auth/login')} size="lg">
      {$t('login')}
    </Button>
  </div>
</div>
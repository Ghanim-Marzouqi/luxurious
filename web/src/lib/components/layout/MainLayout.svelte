<script lang="ts">
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import { Toaster } from '$lib/components/ui/sonner';
  import { auth } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { t, language } from '$lib/i18n';
  import Copyright from './Copyright.svelte';
  import { page } from '$app/stores';
  
  let { title = '' } = $props<{ title?: string }>();
  let sidebarOpen = $state(true);
  
  // Check authentication on mount
  onMount(async () => {
    await auth.checkAuth();
  });
  
  function handleSidebarToggle(event: CustomEvent<{ open: boolean }>) {
    sidebarOpen = event.detail.open;
  }
  
  // For debugging
  const currentLanguage = $derived($language);
  
  // Get the current language direction
  const isRTL = $derived(currentLanguage.dir === 'rtl');
</script>

<div class="relative min-h-screen flex">
  {#if $auth.isAuthenticated}
    <Sidebar user={$auth.user} open={sidebarOpen} on:toggle={handleSidebarToggle} />
  {/if}
  
  <div class="flex-1 flex flex-col transition-all duration-300" 
    class:ml-64={sidebarOpen && $auth.isAuthenticated && !isRTL}
    class:ml-16={!sidebarOpen && $auth.isAuthenticated && !isRTL}
    class:mr-64={sidebarOpen && $auth.isAuthenticated && isRTL}
    class:mr-16={!sidebarOpen && $auth.isAuthenticated && isRTL}>
    <Header />
    
    <main class="flex-1 container py-6">
      {#if title}
        <div class="mb-6">
          <h1 class="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
      {/if}
      
      <slot />
    </main>
    
    <footer class="border-t py-6 md:py-0">
      <div class="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <Copyright className="text-center text-sm leading-loose text-muted-foreground md:text-left" />
      </div>
    </footer>
  </div>
  
  <Toaster />
</div>

<!-- Debug info (hidden in production) -->
<div class="hidden">
  Current language: {currentLanguage.code}, dir: {currentLanguage.dir}, isRTL: {isRTL}
</div> 
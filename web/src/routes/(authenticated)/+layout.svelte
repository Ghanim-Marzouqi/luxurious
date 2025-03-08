<script lang="ts">
  import { MainLayout } from '$lib/components/layout';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  let { children } = $props();
  let isLoading = $state(true);
  
  onMount(async () => {
    isLoading = true;
    const isAuthenticated = await auth.checkAuth();
    
    if (!isAuthenticated) {
      goto('/auth/login');
    }
    
    isLoading = false;
  });
</script>

{#if isLoading}
  <MainLayout>
    <div class="flex justify-center items-center h-64">
      <p>Loading...</p>
    </div>
  </MainLayout>
{:else}
  <MainLayout>
    {@render children()}
  </MainLayout>
{/if} 
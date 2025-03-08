<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { dressesApi } from '$lib/services/api';
  import { toast } from 'svelte-sonner';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { formatCurrency } from '$lib/utils';
  import type { Dress } from '$lib/types';
  import { Plus, Search } from 'lucide-svelte';
  
  let dresses: Dress[] = [];
  let isLoading = true;
  let searchQuery = '';
  
  // Fetch dresses
  async function fetchDresses() {
    isLoading = true;
    
    try {
      const response = await dressesApi.getAll();
      if (response.data) {
        dresses = response.data;
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  // Search dresses
  async function searchDresses() {
    if (!searchQuery.trim()) {
      fetchDresses();
      return;
    }
    
    isLoading = true;
    
    try {
      const response = await dressesApi.search(searchQuery);
      if (response.data) {
        dresses = response.data;
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    fetchDresses();
  });
</script>

<div>
  <div class="flex justify-between items-center mb-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">{$t('dresses')}</h1>
      <p class="text-muted-foreground">{$t('dressesList')}</p>
    </div>
    <Button>
      <Plus class="mr-2 h-4 w-4" />
      {$t('addDress')}
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
        on:keydown={(e) => e.key === 'Enter' && searchDresses()}
      />
    </div>
    <Button variant="outline" class="ml-2" on:click={searchDresses}>
      {$t('search')}
    </Button>
  </div>
  
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <p>{$t('loading')}</p>
    </div>
  {:else if dresses.length === 0}
    <div class="flex justify-center items-center h-64 border rounded-lg">
      <div class="text-center">
        <p class="text-muted-foreground">{$t('noDressesFound')}</p>
        <Button variant="outline" class="mt-4" on:click={fetchDresses}>
          {$t('refreshList')}
        </Button>
      </div>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each dresses as dress}
        <Card>
          <div class="aspect-[4/3] relative">
            <img 
              src={dress.imageUrl} 
              alt={dress.name} 
              class="object-cover w-full h-full rounded-t-lg"
            />
            <Badge 
              class="absolute top-2 right-2" 
              variant={dress.isAvailable ? "default" : "destructive"}
            >
              {dress.isAvailable ? $t('available') : $t('unavailable')}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>{dress.name}</CardTitle>
            <p class="text-sm text-muted-foreground">{dress.category} • {dress.size} • {dress.color}</p>
          </CardHeader>
          <CardContent>
            <p class="text-sm line-clamp-2">{dress.description}</p>
            <div class="mt-2 flex justify-between">
              <div>
                <p class="text-sm text-muted-foreground">{$t('price')}</p>
                <p class="font-semibold">{formatCurrency(dress.price)}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">{$t('rentalPrice')}</p>
                <p class="font-semibold">{formatCurrency(dress.rentalPrice)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full">
              {$t('view')}
            </Button>
          </CardFooter>
        </Card>
      {/each}
    </div>
  {/if}
</div> 
<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import { customersApi } from '$lib/services/api';
  import { toast } from 'svelte-sonner';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import { formatDate } from '$lib/utils';
  import type { Customer } from '$lib/types';
  import { Plus, Search } from 'lucide-svelte';
  
  let customers: Customer[] = [];
  let isLoading = true;
  let searchQuery = '';
  
  // Fetch customers
  async function fetchCustomers() {
    isLoading = true;
    
    try {
      const response = await customersApi.getAll();
      if (response.data) {
        customers = response.data;
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  // Search customers
  async function searchCustomers() {
    if (!searchQuery.trim()) {
      fetchCustomers();
      return;
    }
    
    isLoading = true;
    
    try {
      const response = await customersApi.search(searchQuery);
      if (response.data) {
        customers = response.data;
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  onMount(() => {
    fetchCustomers();
  });
</script>

<div>
  <div class="flex justify-between items-center mb-6">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">{$t('customers')}</h1>
      <p class="text-muted-foreground">{$t('customersList')}</p>
    </div>
    <Button>
      <Plus class="mr-2 h-4 w-4" />
      {$t('addCustomer')}
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
        on:keydown={(e) => e.key === 'Enter' && searchCustomers()}
      />
    </div>
    <Button variant="outline" class="ml-2" on:click={searchCustomers}>
      {$t('search')}
    </Button>
  </div>
  
  {#if isLoading}
    <div class="flex justify-center items-center h-64">
      <p>{$t('loading')}</p>
    </div>
  {:else if customers.length === 0}
    <div class="flex justify-center items-center h-64 border rounded-lg">
      <div class="text-center">
        <p class="text-muted-foreground">{$t('noCustomersFound')}</p>
        <Button variant="outline" class="mt-4" on:click={fetchCustomers}>
          {$t('refreshList')}
        </Button>
      </div>
    </div>
  {:else}
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{$t('name')}</TableHead>
            <TableHead>{$t('email')}</TableHead>
            <TableHead>{$t('phone')}</TableHead>
            <TableHead>{$t('createdAt')}</TableHead>
            <TableHead class="text-right">{$t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each customers as customer}
            <TableRow>
              <TableCell class="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{formatDate(customer.createdAt)}</TableCell>
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
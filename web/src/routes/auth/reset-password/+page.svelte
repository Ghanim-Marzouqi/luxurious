<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { auth } from '$lib/stores/auth';
  import { t } from '$lib/i18n';
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { isValidEmail } from '$lib/utils';
  import { LanguageSwitcher } from '$lib/components/layout';
  
  let email = $state('');
  let isLoading = $state(false);
  let emailSent = $state(false);
  let error = $state('');
  
  // Redirect if already authenticated
  $effect(() => {
    if ($auth.isAuthenticated) {
      goto('/dashboard');
    }
  });
  
  // Handle reset password request
  async function handleResetPassword() {
    if (!email) {
      error = $t('required');
      return;
    }
    
    if (!isValidEmail(email)) {
      error = $t('invalidEmail');
      return;
    }
    
    error = '';
    isLoading = true;
    
    try {
      const result = await auth.resetPassword({ email });
      
      if (result.success) {
        emailSent = true;
        toast.success($t('resetLinkSent'));
      } else {
        toast.error(result.error || $t('somethingWentWrong'));
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
  <div class="absolute top-4 right-4">
    <LanguageSwitcher />
  </div>
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col items-center justify-center space-y-2 text-center w-full">
      <h1 class="text-2xl font-semibold tracking-tight text-primary">{$t('appName')}</h1>
      <p class="text-sm text-muted-foreground">
        {emailSent ? $t('checkYourEmail') : $t('resetYourPassword')}
      </p>
    </div>
    
    <Card>
      <CardContent>
        {#if !emailSent}
          <form onsubmit={(e) => { e.preventDefault(); handleResetPassword(); }} class="space-y-4">
            <div class="space-y-2">
              <Label for="email">{$t('email')}</Label>
              <Input 
                id="email" 
                type="email" 
                bind:value={email} 
                placeholder="name@example.com" 
                autocomplete="email"
                class={error ? 'border-destructive' : ''}
              />
              {#if error}
                <p class="text-xs text-destructive">{error}</p>
              {/if}
            </div>
            
            <Button type="submit" class="w-full" disabled={isLoading}>
              {#if isLoading}
                <span class="mr-2">{$t('loading')}</span>
              {:else}
                {$t('sendResetLink')}
              {/if}
            </Button>
          </form>
        {:else}
          <div class="text-center py-4">
            <p class="text-sm text-muted-foreground mb-4">
              {$t('resetLinkSentLong')}
            </p>
            <Button variant="outline" onclick={() => goto('/auth/login')}>
              {$t('backToLogin')}
            </Button>
          </div>
        {/if}
      </CardContent>
      <CardFooter>
        <div class="flex items-center justify-center text-center w-full">
          <a href="/auth/login" class="text-xs text-primary hover:underline">
            {$t('rememberPassword')}
          </a>
        </div>
      </CardFooter>
    </Card>
  </div>
</div> 
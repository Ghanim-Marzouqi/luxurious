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
  
  let email = '';
  let isLoading = false;
  let emailSent = false;
  let error = '';
  
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
  <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight text-primary">{$t('appName')}</h1>
      <p class="text-sm text-muted-foreground">
        {emailSent ? $t('checkYourEmail') : $t('resetYourPassword')}
      </p>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>{$t('resetPassword')}</CardTitle>
        <CardDescription>
          {emailSent ? $t('resetLinkSentDescription') : $t('enterYourEmail')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {#if !emailSent}
          <form on:submit|preventDefault={handleResetPassword} class="space-y-4">
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
            <Button variant="outline" on:click={() => goto('/auth/login')}>
              {$t('backToLogin')}
            </Button>
          </div>
        {/if}
      </CardContent>
      <CardFooter>
        <div class="text-center w-full">
          <a href="/auth/login" class="text-xs text-primary hover:underline">
            {$t('rememberPassword')}
          </a>
        </div>
      </CardFooter>
    </Card>
  </div>
</div> 
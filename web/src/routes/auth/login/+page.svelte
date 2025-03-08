<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { auth } from '$lib/stores/auth';
  import { t } from '$lib/i18n';
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { isValidEmail } from '$lib/utils';
  
  let email = '';
  let password = '';
  let rememberMe = false;
  let isLoading = false;
  let errors = { email: '', password: '' };
  
  // Redirect if already authenticated
  $effect(() => {
    if ($auth.isAuthenticated) {
      goto('/dashboard');
    }
  });
  
  // Validate form
  function validateForm() {
    let isValid = true;
    errors = { email: '', password: '' };
    
    if (!email) {
      errors.email = $t('required');
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = $t('invalidEmail');
      isValid = false;
    }
    
    if (!password) {
      errors.password = $t('required');
      isValid = false;
    }
    
    return isValid;
  }
  
  // Handle login
  async function handleLogin() {
    if (!validateForm()) return;
    
    isLoading = true;
    
    try {
      const result = await auth.login({ email, password, rememberMe });
      
      if (result.success) {
        toast.success($t('loginSuccessful'));
        goto('/dashboard');
      } else {
        toast.error(result.error || $t('somethingWentWrong'));
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  // Quick login as admin for demo purposes
  async function loginAsAdmin() {
    isLoading = true;
    
    try {
      const result = await auth.login({ 
        email: 'admin@luxurious.com', 
        password: 'password', 
        rememberMe: true 
      });
      
      if (result.success) {
        toast.success($t('loginSuccessful'));
        goto('/dashboard');
      } else {
        toast.error(result.error || $t('somethingWentWrong'));
      }
    } catch (error) {
      toast.error($t('somethingWentWrong'));
    } finally {
      isLoading = false;
    }
  }
  
  // Quick login as staff for demo purposes
  async function loginAsStaff() {
    isLoading = true;
    
    try {
      const result = await auth.login({ 
        email: 'staff@luxurious.com', 
        password: 'password', 
        rememberMe: true 
      });
      
      if (result.success) {
        toast.success($t('loginSuccessful'));
        goto('/dashboard');
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
      <p class="text-sm text-muted-foreground">{$t('loginToYourAccount')}</p>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>{$t('login')}</CardTitle>
        <CardDescription>{$t('enterYourCredentials')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form on:submit|preventDefault={handleLogin} class="space-y-4">
          <div class="space-y-2">
            <Label for="email">{$t('email')}</Label>
            <Input 
              id="email" 
              type="email" 
              bind:value={email} 
              placeholder="name@example.com" 
              autocomplete="email"
              class={errors.email ? 'border-destructive' : ''}
            />
            {#if errors.email}
              <p class="text-xs text-destructive">{errors.email}</p>
            {/if}
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">{$t('password')}</Label>
              <a href="/auth/reset-password" class="text-xs text-primary hover:underline">
                {$t('forgotPassword')}
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              bind:value={password} 
              autocomplete="current-password"
              class={errors.password ? 'border-destructive' : ''}
            />
            {#if errors.password}
              <p class="text-xs text-destructive">{errors.password}</p>
            {/if}
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox id="remember" bind:checked={rememberMe} />
            <Label for="remember" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {$t('rememberMe')}
            </Label>
          </div>
          
          <Button type="submit" class="w-full" disabled={isLoading}>
            {#if isLoading}
              <span class="mr-2">{$t('loading')}</span>
            {:else}
              {$t('login')}
            {/if}
          </Button>
        </form>
        
        <!-- Demo login buttons -->
        <div class="mt-4 space-y-2">
          <p class="text-xs text-center text-muted-foreground">Quick login for demo:</p>
          <div class="flex gap-2">
            <Button variant="outline" class="flex-1" size="sm" on:click={loginAsAdmin} disabled={isLoading}>
              Admin
            </Button>
            <Button variant="outline" class="flex-1" size="sm" on:click={loginAsStaff} disabled={isLoading}>
              Staff
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p class="text-xs text-center text-muted-foreground w-full">
          {$t('demoCredentials')}: admin@luxurious.com / password
        </p>
      </CardFooter>
    </Card>
  </div>
</div> 
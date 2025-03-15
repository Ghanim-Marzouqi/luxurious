<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { t } from '$lib/i18n';
  import { toast } from 'svelte-sonner';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { getInitials } from '$lib/utils';
  
  // User profile data
  let name = $state($auth.user?.name || '');
  let email = $state($auth.user?.email || '');
  let currentPassword = $state('');
  let newPassword = $state('');
  let confirmPassword = $state('');
  let isLoading = $state(false);
  let errors = $state({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Validate profile form
  function validateProfileForm() {
    let isValid = true;
    errors.name = '';
    errors.email = '';
    
    if (!name) {
      errors.name = $t('required');
      isValid = false;
    }
    
    if (!email) {
      errors.email = $t('required');
      isValid = false;
    }
    
    return isValid;
  }
  
  // Validate password form
  function validatePasswordForm() {
    let isValid = true;
    errors.currentPassword = '';
    errors.newPassword = '';
    errors.confirmPassword = '';
    
    if (!currentPassword) {
      errors.currentPassword = $t('required');
      isValid = false;
    }
    
    if (!newPassword) {
      errors.newPassword = $t('required');
      isValid = false;
    } else if (newPassword.length < 8) {
      errors.newPassword = $t('passwordLength');
      isValid = false;
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = $t('required');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = $t('passwordsDoNotMatch');
      isValid = false;
    }
    
    return isValid;
  }
  
  // Update profile
  async function updateProfile() {
    if (!validateProfileForm()) return;
    
    isLoading = true;
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll just simulate a successful update
      setTimeout(() => {
        if ($auth.user) {
          $auth.user.name = name;
          toast.success($t('profileUpdated'));
        }
        isLoading = false;
      }, 1000);
    } catch (error) {
      toast.error($t('somethingWentWrong'));
      isLoading = false;
    }
  }
  
  // Change password
  async function changePassword() {
    if (!validatePasswordForm()) return;
    
    isLoading = true;
    
    try {
      // In a real app, this would be an API call
      // For demo, we'll just simulate a successful update
      setTimeout(() => {
        toast.success($t('passwordChanged'));
        currentPassword = '';
        newPassword = '';
        confirmPassword = '';
        isLoading = false;
      }, 1000);
    } catch (error) {
      toast.error($t('somethingWentWrong'));
      isLoading = false;
    }
  }
</script>

<div class="container py-10">
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">{$t('profile')}</h2>
      <p class="text-muted-foreground">{$t('manageYourProfile')}</p>
    </div>
    
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Profile Information -->
      <Card>
        <CardHeader>
          <CardTitle>{$t('profileInformation')}</CardTitle>
          <CardDescription>{$t('updateYourProfileDetails')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center space-x-4 mb-6">
            <Avatar class="h-20 w-20">
              <AvatarImage src="" alt={name} />
              <AvatarFallback class="text-lg">{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 class="text-lg font-medium">{name}</h3>
              <p class="text-sm text-muted-foreground">{email}</p>
              <p class="text-sm text-muted-foreground">{$t(`roles.${$auth.user?.role || 'staff'}`)}</p>
            </div>
          </div>
          
          <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); updateProfile(); }}>
            <div class="space-y-2">
              <Label for="name">{$t('name')}</Label>
              <Input 
                id="name" 
                bind:value={name} 
                class={errors.name ? 'border-destructive' : ''}
              />
              {#if errors.name}
                <p class="text-xs text-destructive">{errors.name}</p>
              {/if}
            </div>
            
            <div class="space-y-2">
              <Label for="email">{$t('email')}</Label>
              <Input 
                id="email" 
                type="email" 
                bind:value={email} 
                disabled
                class={errors.email ? 'border-destructive' : ''}
              />
              {#if errors.email}
                <p class="text-xs text-destructive">{errors.email}</p>
              {/if}
              <p class="text-xs text-muted-foreground">{$t('emailCannotBeChanged')}</p>
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {#if isLoading}
                <span class="mr-2">{$t('loading')}</span>
              {:else}
                {$t('save')}
              {/if}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <!-- Change Password -->
      <Card>
        <CardHeader>
          <CardTitle>{$t('changePassword')}</CardTitle>
          <CardDescription>{$t('updateYourPassword')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); changePassword(); }}>
            <div class="space-y-2">
              <Label for="current-password">{$t('currentPassword')}</Label>
              <Input 
                id="current-password" 
                type="password" 
                bind:value={currentPassword} 
                class={errors.currentPassword ? 'border-destructive' : ''}
              />
              {#if errors.currentPassword}
                <p class="text-xs text-destructive">{errors.currentPassword}</p>
              {/if}
            </div>
            
            <div class="space-y-2">
              <Label for="new-password">{$t('newPassword')}</Label>
              <Input 
                id="new-password" 
                type="password" 
                bind:value={newPassword} 
                class={errors.newPassword ? 'border-destructive' : ''}
              />
              {#if errors.newPassword}
                <p class="text-xs text-destructive">{errors.newPassword}</p>
              {/if}
            </div>
            
            <div class="space-y-2">
              <Label for="confirm-password">{$t('confirmPassword')}</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                bind:value={confirmPassword} 
                class={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {#if errors.confirmPassword}
                <p class="text-xs text-destructive">{errors.confirmPassword}</p>
              {/if}
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {#if isLoading}
                <span class="mr-2">{$t('loading')}</span>
              {:else}
                {$t('changePassword')}
              {/if}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</div> 
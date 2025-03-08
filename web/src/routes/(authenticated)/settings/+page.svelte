<script lang="ts">
  import { t } from '$lib/i18n';
  import { auth } from '$lib/stores/auth';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { toast } from 'svelte-sonner';
  import { language, languages } from '$lib/i18n';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
  
  // Only admin can access this page
  $effect(() => {
    if ($auth.user && $auth.user.role !== 'admin') {
      window.location.href = '/dashboard';
    }
  });
  
  // Business information
  let businessName = 'The LUXURIOUS';
  let businessEmail = 'info@luxurious.com';
  let businessPhone = '+1 (555) 123-4567';
  let businessAddress = '123 Fashion St, New York, NY 10001';
  
  // Save business information
  function saveBusinessInfo() {
    toast.success($t('businessInfoSaved'));
  }
  
  // Change language
  function changeLanguage(lang: string) {
    const selectedLang = languages.find(l => l.code === lang);
    if (selectedLang) {
      language.set(selectedLang);
      toast.success($t('languageChanged'));
    }
  }
</script>

<div>
  <h1 class="text-3xl font-bold tracking-tight">{$t('settings')}</h1>
  <p class="text-muted-foreground">{$t('systemSettings')}</p>
  
  <div class="mt-6">
    <Tabs defaultValue="business" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="business">{$t('businessInfo')}</TabsTrigger>
        <TabsTrigger value="users">{$t('userManagement')}</TabsTrigger>
        <TabsTrigger value="system">{$t('systemSettings')}</TabsTrigger>
      </TabsList>
      
      <!-- Business Information -->
      <TabsContent value="business">
        <Card>
          <CardHeader>
            <CardTitle>{$t('businessInfo')}</CardTitle>
            <CardDescription>{$t('businessInfoDescription')}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="business-name">{$t('businessName')}</Label>
              <Input id="business-name" bind:value={businessName} />
            </div>
            <div class="space-y-2">
              <Label for="business-email">{$t('email')}</Label>
              <Input id="business-email" type="email" bind:value={businessEmail} />
            </div>
            <div class="space-y-2">
              <Label for="business-phone">{$t('phone')}</Label>
              <Input id="business-phone" bind:value={businessPhone} />
            </div>
            <div class="space-y-2">
              <Label for="business-address">{$t('address')}</Label>
              <Input id="business-address" bind:value={businessAddress} />
            </div>
          </CardContent>
          <CardFooter>
            <Button on:click={saveBusinessInfo}>{$t('save')}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <!-- User Management -->
      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>{$t('userManagement')}</CardTitle>
            <CardDescription>{$t('userManagementDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{$t('comingSoon')}</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <!-- System Settings -->
      <TabsContent value="system">
        <Card>
          <CardHeader>
            <CardTitle>{$t('systemSettings')}</CardTitle>
            <CardDescription>{$t('systemSettingsDescription')}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="language">{$t('language')}</Label>
              <Select onSelectedChange={(value) => changeLanguage(value as string)} value={$language.code}>
                <SelectTrigger id="language">
                  <SelectValue placeholder={$t('selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  {#each languages as lang}
                    <SelectItem value={lang.code}>{lang.name}</SelectItem>
                  {/each}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</div> 
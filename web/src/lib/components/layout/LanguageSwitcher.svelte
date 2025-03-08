<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
  import { language, languages, t } from '$lib/i18n';
  import { Globe } from 'lucide-svelte';
  
  // For debugging
  const currentLanguage = $derived($language);
  
  function setLanguage(lang: string) {
    console.log(`Setting language to: ${lang}`);
    const selectedLang = languages.find(l => l.code === lang);
    if (selectedLang) {
      language.set(selectedLang);
      console.log(`Language set to: ${selectedLang.code}, dir: ${selectedLang.dir}`);
      
      // Force a reload to ensure all components update
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  }
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button variant="outline" size="icon" class="rounded-full" builders={[builder]}>
      <Globe class="h-[1.2rem] w-[1.2rem]" />
      <span class="sr-only">Switch language</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    {#each languages as lang}
      <DropdownMenuItem on:click={() => setLanguage(lang.code)}>
        {lang.name} {currentLanguage.code === lang.code ? '✓' : ''}
      </DropdownMenuItem>
    {/each}
  </DropdownMenuContent>
</DropdownMenu>

<!-- Debug info (hidden in production) -->
<div class="hidden">
  Current language: {currentLanguage.code}, dir: {currentLanguage.dir}
</div> 
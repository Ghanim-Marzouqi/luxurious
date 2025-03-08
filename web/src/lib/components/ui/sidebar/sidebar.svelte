<script lang="ts">
  import { cn } from "$lib/utils";
  import { fly } from "svelte/transition";
  import { t, language } from "$lib/i18n";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  let { 
    class: className = "",
    open = true
  } = $props<{
    class?: string;
    open?: boolean;
  }>();
  
  // For debugging
  const currentLanguage = $derived($language);
  
  // Check if the current language is RTL (like Arabic)
  $effect(() => {
    if (browser) {
      const isRTL = currentLanguage.dir === 'rtl';
      console.log(`Setting document direction: ${isRTL ? 'rtl' : 'ltr'}`);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
  });
  
  // Get the current language direction
  const isRTL = $derived(currentLanguage.dir === 'rtl');
</script>

<aside
  class={cn(
    "h-screen fixed top-0 flex flex-col bg-background transition-all duration-300 z-40",
    open ? "w-64" : "w-16",
    isRTL 
      ? "right-0 border-l" 
      : "left-0 border-r",
    className
  )}
>
  <slot />
</aside>

<!-- Debug info (hidden in production) -->
<div class="hidden">
  Current language: {currentLanguage.code}, dir: {currentLanguage.dir}, isRTL: {isRTL}
</div> 
<script lang="ts">
  import { Moon, Sun } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
  import { t } from '$lib/i18n';
  
  // Theme store
  let theme = $state<'light' | 'dark' | 'system'>('system');
  
  // Initialize theme from localStorage or system preference
  function initializeTheme() {
    if (typeof window === 'undefined') return;
    
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    
    if (storedTheme) {
      theme = storedTheme;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    applyTheme();
  }
  
  // Apply theme to document
  function applyTheme() {
    if (typeof window === 'undefined') return;
    
    const isDark = 
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }
  
  // Set theme
  function setTheme(newTheme: 'light' | 'dark' | 'system') {
    theme = newTheme;
    applyTheme();
  }
  
  // Initialize on mount
  $effect(() => {
    initializeTheme();
    
    // Listen for system theme changes
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        if (theme === 'system') {
          applyTheme();
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  });
</script>

<DropdownMenu>
  <DropdownMenuTrigger asChild let:builder>
    <Button variant="outline" size="icon" class="rounded-full" builders={[builder]}>
      <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">Toggle theme</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem on:click={() => setTheme('light')}>
      Light
    </DropdownMenuItem>
    <DropdownMenuItem on:click={() => setTheme('dark')}>
      Dark
    </DropdownMenuItem>
    <DropdownMenuItem on:click={() => setTheme('system')}>
      System
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> 
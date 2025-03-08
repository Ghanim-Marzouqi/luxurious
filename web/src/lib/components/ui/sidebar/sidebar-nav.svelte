<script lang="ts">
  import { cn } from "$lib/utils";
  import { page } from "$app/stores";
  import * as LucideIcons from 'lucide-svelte';
  import type { ComponentType, SvelteComponent } from "svelte";

  let { 
    class: className = "", 
    items = [], 
    open = true 
  } = $props<{ 
    class?: string; 
    items: SidebarNavItem[]; 
    open?: boolean; 
  }>();

  export type SidebarNavItem = {
    title: string;
    href: string;
    icon?: ComponentType<SvelteComponent>;
    disabled?: boolean;
  };

  // Function to get icon component safely
  function getIconComponent(iconName: string) {
    return LucideIcons[iconName as keyof typeof LucideIcons] || null;
  }
</script>

<nav class={cn("grid gap-1 px-2", className)}>
  {#each items as item}
    <a
      href={item.href}
      class={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
        $page.url.pathname === item.href
          ? "bg-muted font-medium text-primary"
          : "text-muted-foreground",
        item.disabled && "pointer-events-none opacity-60"
      )}
      aria-disabled={item.disabled}
    >
      {#if item.icon}
        <span class={cn("h-5 w-5", open ? "" : "mx-auto")}>
          {#key item.icon}
            <item.icon />
          {/key}
        </span>
      {/if}
      {#if open}
        <span>{item.title}</span>
      {/if}
    </a>
  {/each}
</nav> 
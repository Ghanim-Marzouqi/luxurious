<script lang="ts">
  import { cn } from "$lib/utils";

  let { class: className = "" } = $props();
</script>

<div class={cn("flex h-16 items-center px-4", className)}>
  <slot />
</div> 
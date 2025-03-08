<script lang="ts">
  import { cn } from "$lib/utils";

  let { class: className = "" } = $props();
</script>

<div class={cn("flex-1 overflow-auto py-2", className)}>
  <slot />
</div> 
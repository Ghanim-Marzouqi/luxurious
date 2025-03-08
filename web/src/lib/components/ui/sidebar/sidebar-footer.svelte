<script lang="ts">
  import { cn } from "$lib/utils";

  let { class: className = "" } = $props();
</script>

<div class={cn("mt-auto border-t px-4 py-4", className)}>
  <slot />
</div> 
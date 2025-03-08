<script lang="ts">
  import { t } from '$lib/i18n';
  
  let { 
    showAllRights = true,
    className = ''
  } = $props<{ 
    showAllRights?: boolean,
    className?: string
  }>();
</script>

<p class={className}>
  &copy; {new Date().getFullYear()} {$t('appName')}{#if showAllRights}. {$t('allRightsReserved')}{/if}
</p> 
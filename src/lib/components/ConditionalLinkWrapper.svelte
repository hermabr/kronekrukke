<script>
  export let href = "";
</script>

{#if href !== ""}
  <a {href}><slot /></a>
{:else}
  <slot />
{/if}

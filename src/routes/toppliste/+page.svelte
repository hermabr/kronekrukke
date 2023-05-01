<script lang="ts">
  import { goto } from "$app/navigation";
</script>

<div class="m-3">
  <button on:click={() => goto("/", { invalidateAll: true })}>
    <h1 class="py-2 text-4xl font-bold text-left text-main">Toppliste</h1>
  </button>
  <main>FOlk</main>
</div>

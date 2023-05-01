<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ leaderboard } = data);
</script>

<div class="m-3">
  <button on:click={() => goto("/", { invalidateAll: true })}>
    <h1 class="py-2 text-4xl font-bold text-left text-main">Toppliste</h1>
  </button>
  <table class="w-full mt-5 overflow-hidden border-collapse rounded">
    <thead class="text-white bg-blue-500">
      <tr>
        <th class="px-4 py-2 text-left">Plass</th>
        <th class="px-4 py-2 text-left">Navn</th>
        <th class="px-4 py-2 text-left">Poeng</th>
      </tr>
    </thead>
    <tbody class="text-white">
      {#each leaderboard as { userRank, name, count }}
        <tr class="bg-gray-600 odd:bg-gray-700 hover:bg-gray-400">
          <td class="px-4 py-2">{userRank}</td>
          <td class="px-4 py-2">{name}</td>
          <td class="px-4 py-2">{count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

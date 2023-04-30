<script lang="ts">
  import { onMount } from "svelte";

  type User = {
    name: string;
  };

  type Fee = {
    id: number;
    comment: string;
    amount: number;
    userId: number;
    addedBy: string;
    addedAt: string;
    user: User;
  };

  let fees: Fee[] = [];
  let loading = true;

  onMount(async () => {
    const response = await fetch("/api/fee");
    fees = await response.json();
    loading = false;
  });
</script>

<main class="block h-screen pt-10 text-white bg-gray-800">
  <h1
    class="mb-5 text-3xl font-bold text-center md:text-5xl md:leading-tight lg:text-7xl lg:leading-none xl:text-8xl xl:le"
  >
    Kronekrukke
  </h1>

  {#if loading}
    <div class="flex items-center justify-center h-screen">
      <div class="text-lg font-semibold text-gray-600">Loading...</div>
    </div>
  {:else if fees.length === 0}
    <div class="flex items-center justify-center h-screen">
      <div class="text-lg font-semibold text-gray-600">
        No posts found. Likely an error.
      </div>
    </div>
  {:else}
    <ul class="grid grid-cols-3 px-40 space-x-5 align-middle">
      {#each fees as fee (fee.id)}
        <li class="px-6 py-4 text-gray-200 bg-gray-600 rounded">
          <div class="card-large">{fee.amount} kr</div>
          <div class="card-medium">{fee.comment}</div>
          <div class="card-medium">{fee.user.name}</div>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  .card-large {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .card-medium {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
</style>

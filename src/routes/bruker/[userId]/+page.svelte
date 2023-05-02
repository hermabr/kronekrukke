<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";
  import ConditionalLinkWrapper from "$lib/components/ConditionalLinkWrapper.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let data: PageData;

  const formatDate = (date: Date) => {
    const currentDate = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (date.toDateString() === currentDate.toDateString()) {
      return `${date.getHours()}:${
        date.getMinutes() < 10 ? "0" : ""
      }${date.getMinutes()}`;
    } else if (
      currentDate.getTime() - date.getTime() <
      7 * 24 * 60 * 60 * 1000
    ) {
      return dayNames[date.getDay()];
    } else {
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }
  };

  const username = $page.data.session
    ? $page.data.session.user
      ? typeof $page.data.session.user.name === "string"
        ? $page.data.session.user.name
        : "unknown"
      : "unknown"
    : "unknown";

  $: ({ user, fees } = data);
</script>

<div class="flex flex-col h-screen p-3 space-y-3">
  <div class="flex justify-between">
    <button on:click={() => goto("/", { invalidateAll: true })}>
      <h1 class="py-2 text-4xl font-bold text-left text-main">
        {user ? user.name.replace(/ .*/,'') : "Avgifter ukjent bruker"}
      </h1>
    </button>
    <a
      href="/toppliste"
      class="grid items-center px-4 py-2 text-xl font-bold text-left text-gray-200 bg-gray-600 rounded place-items-center"
    >
      Toppliste
    </a>
  </div>
  <ul
    class="grid flex-grow grid-cols-1 space-y-4 overflow-y-scroll no-scrollbar"
  >
    {#each fees as fee (fee.id)}
      <ConditionalLinkWrapper
        href={fee.addedBy === username ? `/avgift/${fee.id}` : ""}
      >
        <li
          class="flex justify-between px-6 py-4 text-gray-200 rounded"
          class:bg-gray-600={fee.addedBy === username}
          class:bg-gray-700={fee.addedBy !== username}
        >
          <div>
            <div
              class="text-2xl font-bold text-green-300"
              style="word-wrap: break-word; overflow-wrap: anywhere;"
            >
              {fee.comment}
            </div>
            <div>{fee.amount} kr - {fee.user.name}</div>
          </div>
          <div class="flex flex-col justify-between text-right">
            <div>{formatDate(fee.addedAt)}</div>

            {#if fee.addedBy === username}
              <div class="text-right">Endre</div>
            {/if}
          </div>
        </li>
      </ConditionalLinkWrapper>
    {/each}
  </ul>
</div>

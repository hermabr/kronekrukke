<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

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

  $: ({ fees } = data);
</script>

<div class="flex flex-col h-screen p-3 space-y-3">
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold text-main">Fees</h1>
    <a
      href="/user"
      class="px-4 py-3 text-xl font-semibold text-blue-500 bg-gray-300 rounded"
      >New user</a
    >
  </div>
  <ul
    class="grid flex-grow grid-cols-1 space-y-4 overflow-y-scroll no-scrollbar"
  >
    {#each fees as fee (fee.id)}
      {#if fee.addedBy === username}
        <a href="/endre/{fee.id}">
          <li
            class="flex justify-between px-6 py-4 text-gray-200 bg-gray-600 rounded"
          >
            <div>
              <div class="text-2xl font-bold text-[#9BDEAC]">
                {fee.comment}
              </div>
              <div>{fee.amount} kr - {fee.user.name}</div>
            </div>
            <div class="flex flex-col justify-between text-right">
              <div>{formatDate(fee.addedAt)}</div>

              {#if fee.addedBy === username}
                <div class="text-right">Edit</div>
              {/if}
            </div>
          </li>
        </a>
      {:else}
        <li
          class="flex justify-between px-6 py-4 text-gray-200 bg-gray-500 rounded"
        >
          <div>
            <div class="text-2xl font-bold text-[#9BDEAC]">
              {fee.comment}
            </div>
            <div>{fee.amount} kr - {fee.user.name}</div>
          </div>
          <div class="flex flex-col justify-between text-right">
            <div>{formatDate(fee.addedAt)}</div>
          </div>
        </li>
      {/if}
    {/each}
  </ul>
  <a
    href="/new"
    class="block py-5 mt-5 text-2xl font-bold text-center text-blue-500 bg-gray-300 rounded"
    >New fee</a
  >
</div>

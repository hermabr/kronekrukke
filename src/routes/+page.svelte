<script lang="ts">
  import type { PageData } from "./$types";

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

  $: ({ fees } = data);
</script>

<div class="flex flex-col h-screen p-3">
  <h1 class="mb-4 text-4xl font-bold text-gray-200">Fees</h1>
  <ul
    class="grid flex-grow grid-cols-1 space-y-4 overflow-y-scroll no-scrollbar"
  >
    {#each fees as fee (fee.id)}
      <li
        class="flex justify-between px-6 py-4 text-gray-200 bg-gray-600 rounded"
      >
        <div>
          <div>{fee.amount} kr</div>
          <div>{fee.comment}</div>
          <div>{fee.user.name}</div>
        </div>
        <div>{formatDate(fee.addedAt)}</div>
      </li>
    {/each}
  </ul>
  <a
    href="/new"
    class="block py-5 mt-5 text-2xl font-bold text-center text-blue-500 bg-gray-200 rounded"
    >Add new user</a
  >
</div>

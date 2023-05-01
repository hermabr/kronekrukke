<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ users } = data);
</script>

<div class="m-3">
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold text-gray-200">Users</h1>
    <a
      href="/"
      class="px-4 py-3 text-xl font-semibold text-blue-500 bg-gray-300 rounded"
      >Home</a
    >
  </div>
  <main>
    <form action="?/createUser" method="POST" class="flex flex-col w-64 my-8">
      <input
        type="text"
        name="name"
        placeholder="Name"
        class="px-1 py-1 text-black border border-gray-400 rounded"
      />
      <button type="submit" class="mt-2 text-lg text-white bg-blue-500 rounded">
        Add new user</button
      >
    </form>
    <div>
      {#each users as user}
        <p class="text-gray-300">{user.name}</p>
      {/each}
    </div>
  </main>
</div>

<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  $: ({ users } = data);
</script>

<div class="m-3">
  <h1 class="mb-4 text-4xl font-bold text-gray-200">Users</h1>
  <main>
    <form action="?/createUser" method="POST" class="flex flex-col w-64 mb-4">
      <input type="text" name="name" class="border border-gray-400" />
      <button type="submit" class="mt-2 text-white bg-blue-500">
        Add new user</button
      >
    </form>
    <div>
      {#each users as user}
        <p class="text-gray-800">{user.name}</p>
      {/each}
    </div>
  </main>
</div>

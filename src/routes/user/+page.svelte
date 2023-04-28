<script lang="ts">
  import { onMount } from "svelte";

  type User = {
    id: number;
    name: string;
  };

  let users: User[] = [];
  let loading = true;

  let newUserName = "";

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newUserName }),
    });

    if (response.ok) {
      newUserName = ""; // Clear the input field after successful submission
      updateUsers();
    } else {
      console.log(response);
      alert("Failed to add user.");
    }
  };

  const updateUsers = async () => {
    const data = await fetch("/api/user").then((res) => res.json());
    users = data;
    loading = false;
  };

  onMount(async () => {
    updateUsers();
  });
</script>

<div class="m-3">
  <h1 class="mb-4 text-4xl font-bold text-gray-800">Users</h1>
  <main>
    <form on:submit={handleSubmit} class="flex flex-col w-64 mb-4">
      <input
        bind:value={newUserName}
        type="text"
        name="name"
        class="border border-gray-400"
      />
      <button type="submit" class="mt-2 text-white bg-blue-500">
        Add new user</button
      >
    </form>
    <div>
      <!-- if loading show loading users -->
      {#if loading}
        <p class="text-gray-800">Loading users...</p>
      {:else}
        {#each users as user}
          <p class="text-gray-800">{user.name}</p>
        {/each}
      {/if}
    </div>
  </main>
</div>

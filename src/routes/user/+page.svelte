<script lang="ts">
  import { toast } from "svelte-french-toast";
  import type { PageData } from "./$types";
  // import { goto } from "$app/navigation";

  export let data: PageData;

  $: ({ users } = data);

  let name = "";

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Creating fee...", {
      position: "bottom-center",
    });

    const formData = new FormData();
    formData.append("name", name);

    // get the json response
    const response = await fetch("?/createUser", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    const message = JSON.parse(response.data)[1];
    if (response["type"] == "success") {
      toast.success(message, { id: loadingToast, position: "bottom-center" });
      // goto("/");
    } else {
      toast.error(message, { id: loadingToast, position: "bottom-center" });
    }
  };
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
    <form on:submit={handleFormSubmit} class="flex flex-col w-64 my-8">
      <input
        type="text"
        name="name"
        placeholder="Name"
        class="px-1 py-1 text-black border border-gray-400 rounded"
        bind:value={name}
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

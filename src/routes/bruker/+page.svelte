<script lang="ts">
  import { toast } from "svelte-french-toast";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

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

    const response = await fetch("?/createUser", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    const message = JSON.parse(response.data)[1];
    console.log("Message");
    console.log(message);
    if (response["type"] == "success") {
      toast.success(message, {
        id: loadingToast,
        position: "bottom-center",
        duration: 3000,
      });
      name = "";
      goto("/bruker", { invalidateAll: true });
    } else {
      toast.error(message, {
        id: loadingToast,
        position: "bottom-center",
        duration: 3000,
      });
    }
  };
</script>

<div class="m-3">
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-bold text-main">Brukere</h1>
    <a
      href="/"
      class="px-4 py-3 text-xl font-semibold text-gray-300 bg-gray-700 rounded"
      >Tilbake</a
    >
  </div>
  <main>
    <form on:submit={handleFormSubmit} class="flex flex-col my-8">
      <input
        type="text"
        name="name"
        placeholder="Name"
        class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        bind:value={name}
      />
      <button
        type="submit"
        class="px-8 py-2.5 mt-5 font-semibold text-gray-200 bg-blue-500 rounded"
      >
        Legg til</button
      >
    </form>
    <div>
      {#each users as user}
        <p class="text-gray-300">{user.name}</p>
      {/each}
    </div>
  </main>
</div>

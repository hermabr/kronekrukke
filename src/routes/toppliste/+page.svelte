<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import { toast } from "svelte-french-toast";

  let name = "";

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Legger til bruker...", {
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
      goto("/toppliste", { invalidateAll: true });
    } else {
      toast.error(message, {
        id: loadingToast,
        position: "bottom-center",
        duration: 3000,
      });
    }
  };

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
      {#each leaderboard as { id, rank, navn, avgifter }}
        <tr
          class="bg-gray-600 odd:bg-gray-700 hover:bg-gray-400 hover:cursor-pointer"
          on:click={() => goto(`/bruker/${id}`)}
        >
          <td class="px-4 py-2">{rank}</td>
          <td class="px-4 py-2">{navn}</td>
          <td class="px-4 py-2">{avgifter}</td>
        </tr>
      {/each}

      <tr class="bg-green-500">
        <td class="px-4 py-2">Totalt</td>
        <td class="px-4 py-2" />
        <td class="px-4 py-2"
          >{leaderboard.reduce((a, b) => a + Number(b.avgifter), 0)}
        </td>
      </tr>
    </tbody>
  </table>

  <form on:submit={handleFormSubmit} class="flex flex-col my-8">
    <h1 class="mb-2 text-2xl font-semibold">Ny bruker</h1>

    <input
      type="text"
      name="name"
      placeholder="Navn"
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
</div>

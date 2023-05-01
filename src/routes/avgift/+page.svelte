<script lang="ts">
  import type { PageData } from "./$types";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data: PageData;

  $: ({ users } = data);

  let selectedUser = -1;
  let comment = "";
  let amount = 1;

  const username = $page.data.session
    ? $page.data.session.user
      ? typeof $page.data.session.user.name === "string"
        ? $page.data.session.user.name
        : "unknown"
      : "unknown"
    : "unknown";

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Lager avgift...", {
      position: "bottom-center",
    });

    const formData = new FormData();
    formData.append("userId", selectedUser.toString());
    formData.append("comment", comment);
    formData.append("amount", amount.toString());
    formData.append("addedBy", username);

    // get the json response
    const response = await fetch("?/createFee", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    const message = JSON.parse(response.data)[1];
    if (response["type"] == "success") {
      toast.success(message, {
        id: loadingToast,
        position: "bottom-center",
        duration: 3000,
      });
      goto("/");
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
  <div class="flex items-center justify-between mb-5">
    <h1 class="text-4xl font-bold text-main">Ny avgift</h1>
    <a
      href="/"
      class="px-4 py-3 text-xl font-semibold text-gray-300 bg-gray-700 rounded"
      >Tilbake</a
    >
  </div>
  <form
    method="POST"
    class="flex flex-col space-y-3"
    on:submit={handleFormSubmit}
  >
    <div>
      {#each users as user}
        <div>
          <input
            type="radio"
            id={"user-" + user.id}
            name="userId"
            value={user.id}
            bind:group={selectedUser}
            required
          />
          <label for={"user-" + user.id}>{user.name}</label>
        </div>
      {/each}
    </div>
    <div>
      <label for="comment" class="block mb-2 text-lg font-medium">Utsagn:</label
      >
      <input
        type="text"
        name="comment"
        bind:value={comment}
        class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label for="amount" class="block mb-2 text-lg font-medium"
        >Antall fortredelser:</label
      >
      <input
        type="number"
        name="amount"
        min="1"
        bind:value={amount}
        class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <button
        type="submit"
        class="px-8 py-4 mt-5 font-semibold text-gray-200 bg-blue-500 rounded"
        >Legg til</button
      >
    </div>
  </form>
</div>

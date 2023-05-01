<script lang="ts">
  import type { PageData } from "./$types";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  export let data: PageData;

  $: ({ avgift, users } = data);

  const username = $page.data.session
    ? $page.data.session.user
      ? typeof $page.data.session.user.name === "string"
        ? $page.data.session.user.name
        : "unknown"
      : "unknown"
    : "unknown";

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Updating fee...", {
      position: "bottom-center",
    });

    const formData = new FormData();
    formData.append("userId", avgift.userId.toString());
    formData.append("comment", avgift.comment);
    formData.append("amount", avgift.amount.toString());
    formData.append("addedBy", username);

    const response = await fetch(`./${avgift.id}?/endreAvgift`, {
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
      goto("/", { invalidateAll: true, replaceState: true });
    } else {
      toast.error(message, {
        id: loadingToast,
        position: "bottom-center",
        duration: 3000,
      });
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm("Are you sure you want to delete this fee?");
    if (!confirmation) return;

    const loadingToast = toast.loading("Deleting fee...", {
      position: "bottom-center",
    });

    const formData = new FormData();
    formData.append("addedBy", username);

    const response = await fetch(`./${avgift.id}?/slettAvgift`, {
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
      goto("/", { invalidateAll: true, replaceState: true });
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
  <h1 class="mb-4 text-4xl font-bold text-gray-200">Edit Fee</h1>

  <a href="/" class="inline-block px-8 py-4 mb-3 bg-gray-700 rounded">Back</a>
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
            bind:group={avgift.userId}
            required
          />
          <label for={"user-" + user.id}>{user.name}</label>
        </div>
      {/each}
    </div>
    <div>
      <label for="comment" class="block">Comment:</label>
      <input type="text" name="comment" bind:value={avgift.comment} required />
    </div>
    <div>
      <label for="amount" class="block">Amount:</label>
      <input type="number" name="amount" bind:value={avgift.amount} required />
    </div>
    <div>
      <button type="submit" class="px-8 py-4 bg-gray-700 rounded">Update</button
      >
    </div>
  </form>
  <div class="mt-3">
    <button
      type="button"
      class="px-8 py-4 bg-red-600 rounded"
      on:click={handleDelete}>Delete</button
    >
  </div>
</div>

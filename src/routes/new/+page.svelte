<script lang="ts">
  import type { PageData } from "./$types";
  import toast from "svelte-french-toast";

  export let data: PageData;

  $: ({ users } = data);

  let selectedUser = 5;
  let comment = "Wow - Huff";
  let amount = 0;

  const handleFormSubmit = async (event: Event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Creating fee...");

    const formData = new FormData();
    formData.append("user", selectedUser.toString());
    formData.append("comment", comment);
    formData.append("amount", amount.toString());

    // get the json response
    const response = await fetch("?/createFee", {
      method: "POST",
      body: formData,
    }).then((r) => r.json());

    const message = JSON.parse(response.data)[1];
    if (response["type"] == "success") {
      toast.success(message, { id: loadingToast });
    } else {
      toast.error(message, { id: loadingToast });
    }
  };
</script>

<div class="m-3">
  <h1 class="mb-4 text-4xl font-bold text-gray-200">New</h1>

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
            name="user"
            value={user.id}
            bind:group={selectedUser}
          />
          <label for={"user-" + user.id}>{user.name}</label>
        </div>
      {/each}
    </div>
    <div>
      <label for="comment" class="block">Comment:</label>
      <input type="text" name="comment" bind:value={comment} />
    </div>
    <div>
      <label for="amount" class="block">Amount:</label>
      <input type="number" name="amount" bind:value={amount} />
    </div>
    <div>
      <input
        type="submit"
        value="Create"
        class="px-8 py-4 bg-gray-700 rounded"
      />
    </div>
  </form>
</div>

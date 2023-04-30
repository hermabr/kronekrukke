<script>
  import "../app.css";

  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<!-- {#if $page.data.session}
  <span class="signedInText">
    <small>Signed in as</small><br />
    <strong>{$page.data.session.user?.name ?? "User"}</strong>
    <a href="/user">To users</a>
  </span>
  <button on:click={() => signOut()} class="button">Sign out</button>
{:else}
  <span class="notSignedInText">You are not signed in</span>
  <button on:click={() => signIn("github")}>Sign In with GitHub</button>
{/if} -->

<slot />

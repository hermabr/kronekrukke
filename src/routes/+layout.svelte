<script>
  import "../app.css";

  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";

  import { Toaster } from "svelte-french-toast";
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
  <title>Kronekrukke</title>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  />
  <meta name="robots" content="noindex" />
  <meta name="theme-color" content="#333333" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
</svelte:head>

<Toaster />

{#if $page.data.session}
  <!-- show username for page session -->
  <p>
    Name: {$page.data.session.user
      ? $page.data.session.user.name
      : "unknown name"}
  </p>
  <slot />
{:else}
  <div class="flex items-center justify-center h-screen px-5 space-x-5">
    <button
      aria-label="Continue with github"
      class="flex items-center justify-center w-full px-4 py-3 mt-4 bg-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700"
      on:click={() => signIn("github")}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1543 0C4.6293 0 0.154298 4.475 0.154298 10C0.153164 12.0993 0.813112 14.1456 2.04051 15.8487C3.26792 17.5517 5.00044 18.8251 6.9923 19.488C7.4923 19.575 7.6793 19.275 7.6793 19.012C7.6793 18.775 7.6663 17.988 7.6663 17.15C5.1543 17.613 4.5043 16.538 4.3043 15.975C4.1913 15.687 3.7043 14.8 3.2793 14.562C2.9293 14.375 2.4293 13.912 3.2663 13.9C4.0543 13.887 4.6163 14.625 4.8043 14.925C5.7043 16.437 7.1423 16.012 7.7163 15.75C7.8043 15.1 8.0663 14.663 8.3543 14.413C6.1293 14.163 3.8043 13.3 3.8043 9.475C3.8043 8.387 4.1913 7.488 4.8293 6.787C4.7293 6.537 4.3793 5.512 4.9293 4.137C4.9293 4.137 5.7663 3.875 7.6793 5.163C8.49336 4.93706 9.33447 4.82334 10.1793 4.825C11.0293 4.825 11.8793 4.937 12.6793 5.162C14.5913 3.862 15.4293 4.138 15.4293 4.138C15.9793 5.513 15.6293 6.538 15.5293 6.788C16.1663 7.488 16.5543 8.375 16.5543 9.475C16.5543 13.313 14.2173 14.163 11.9923 14.413C12.3543 14.725 12.6673 15.325 12.6673 16.263C12.6673 17.6 12.6543 18.675 12.6543 19.013C12.6543 19.275 12.8423 19.587 13.3423 19.487C15.3273 18.8168 17.0522 17.541 18.2742 15.8392C19.4962 14.1373 20.1537 12.0951 20.1543 10C20.1543 4.475 15.6793 0 10.1543 0Z"
          fill="#333333"
        />
      </svg>

      <!-- <p class="ml-4 text-base font-semibold text-gray-700">Login</p> -->
    </button>

    <button
      aria-label="Continue with linkedin"
      class="flex items-center justify-center w-full px-4 py-3 mt-4 bg-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700"
      on:click={() => signIn("linkedin")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="30"
        viewBox="0 0 72 72"
        ><g fill="none" fill-rule="evenodd"
          ><path
            d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
            fill="#007EBB"
          /><path
            d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
            fill="#FFF"
          /></g
        ></svg
      >

      <!-- <p class="ml-4 text-base font-semibold text-gray-700">Login</p> -->
    </button>
  </div>
{/if}

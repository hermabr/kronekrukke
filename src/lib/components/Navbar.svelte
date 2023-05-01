<script lang="ts">
  import MenuClose from "./MenuClose.svelte";
  import MenuOpen from "./MenuOpen.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let menuOpen = false;

  const navbarItems = [
    { name: "Hjem", url: "/" },
    { name: "Brukere", url: "/bruker" },
    { name: "Toppliste", url: "/toppliste" },
  ];
</script>

<button
  on:click={() => (menuOpen = !menuOpen)}
  class="absolute z-50 grid bg-white rounded-full top-3 right-3 w-14 h-14 place-items-center"
>
  {#if menuOpen}
    <MenuClose />
  {:else}
    <MenuOpen />
  {/if}
</button>

<div
  class="fixed w-screen h-screen bg-green-900 top-0 transition-[clip-path] duration-500"
  class:clip-circFull={menuOpen}
  class:clip-circSmall={!menuOpen}
  style={`background-image: url("/menu-panel-bg.svg"); background-position-x: "20%"; background-position-y: "-20%"; background-repeat: "no-repeat";`}
>
  <nav class="flex flex-col flex-1 pl-20 mt-24 ml-10 space-y-3">
    {#each navbarItems as item}
      <div class="flex items-center space-x-10">
        <button
          class="text-3xl font-bold uppercase"
          class:text-green-300={$page.url.pathname !== item.url}
          class:text-main={$page.url.pathname === item.url}
          on:click={() => {
            menuOpen = false;
            goto(item.url);
          }}
        >
          {item.name}
        </button>
        <span
          class="flex-1 h-[6px]"
          class:bg-main={$page.url.pathname === item.url}
        />
      </div>
    {/each}
  </nav>
</div>

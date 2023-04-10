<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { authStore, authHandlers } from "$lib/stores/authStore";
  import AuthReset from "$lib/components/AuthReset.svelte";

  let email = "";

  async function handleLogOut() {
    await authHandlers.logout();
    goto("/");
  }

  onMount(() => {
    authStore.subscribe(async (curr) => {
      email = await curr?.currentUser?.email;
    });
  });
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

{#if $authStore.currentUser}
  <h1>CURRENT USER: {email}</h1>
{:else}
  <div text-center>Loading...</div>
{/if}

<AuthReset />

<button class="border-0 btn w-20 py-2 mx-auto mt-6" on:click={handleLogOut}
  >logout</button
>

<div class="text-column">
  <h1>About this app</h1>

  <p>
    This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your
    own by typing the following into your command line and following the prompts:
  </p>

  <pre>npm create svelte@latest</pre>

  <p class="bg-green-100 text-orange-500 pa-4">
    The page you're looking at is purely static HTML, with no client-side
    interactivity needed. Because of that, we don't need to load any JavaScript.
    Try viewing the page's source, or opening the devtools network panel and
    reloading.
  </p>

  <p>
    The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading
    and form handling. Try using it with JavaScript disabled!
  </p>
</div>

<script lang="ts">
  import Header from "./Header.svelte";
  import "uno.css";
  import "./styles.css";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { auth } from "$lib/firebase/firebase.client";
  import { authStore } from "$lib/stores/authStore";

  let showLogo = false;
  function toggleLogo() {
    showLogo = !showLogo;
  }
  $: button = showLogo ? "Hide logo" : "Show logo";

  const hello = "Hello World";
  let count = 0;

  function handleClick() {
    count += 1;
  }

  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      authStore.update((curr) => {
        return { ...curr, isLoading: false, currentUser: user };
      });
    });

    setTimeout(() => {
      if (
        browser &&
        !$authStore?.currentUser &&
        !$authStore?.isLoading &&
        window.location.pathname !== "/"
      ) {
        goto("/");
      }
    }, 10);

    return unsubscribe;
  });
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <footer>
    <span class="logo" />

    {#if showLogo}
      <span
        class:logo={showLogo}
        in:fly={{ y: 200, duration: 2000 }}
        out:fade
      />
    {/if}

    <h1
      class="animate-bounce color-#ff3e00 uppercase font-size-4rem fw-100 line-height-1.1 my-2rem mx-auto max-width-14rem sm:max-width-auto"
    >
      SvelteKit!
    </h1>

    <button class="bg-orange-200 pa-2 text-blue-500" on:click={toggleLogo}
      >{button}</button
    >

    <button class="my-4 text-green-500 pa-2" on:click={handleClick}>
      Clicked {count}
      {count === 1 ? "time" : "times"}
    </button>
    <pre>{hello}</pre>
    <div class:bg-red-300={true}>guxuerui</div>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>

<script lang="ts">
  import { onMount, tick } from "svelte";

  $: currentTheme = "";

  function setTheme() {
    if (currentTheme === "light" || currentTheme === "auto") {
      localStorage.setItem("color-schema", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("color-schema", "light");
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme(event?: MouseEvent) {
    const isAppearanceTransition =
      // @ts-expect-error experimental API
      document?.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isAppearanceTransition) {
      setTheme();
      loadTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
      setTheme();
      loadTheme();
      await tick();
    });
    transition.ready.then(() => {
      console.log("currentTheme: ", currentTheme);
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath:
            currentTheme === "dark" ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: "ease-out",
          pseudoElement:
            currentTheme === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  }

  function loadTheme() {
    currentTheme = localStorage.getItem("color-schema") || "auto";
  }

  onMount(() => {
    loadTheme();
  });
</script>

<button
  class="border-0 bg-transparent icon-btn px-0 !outline-none c-gray-800 hover:c-black dark:text-white"
  on:click={toggleTheme}
>
  {#if currentTheme === "light" || currentTheme === "auto"}
    <div class="scale-180" i-carbon-sun />
  {:else}
    <div class="scale-180" i-carbon-moon />
  {/if}
</button>

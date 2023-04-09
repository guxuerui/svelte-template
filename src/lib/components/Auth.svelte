<script lang="ts">
  import Register from "$lib/components/Register.svelte";
  import Login from "$lib/components/Login.svelte";

  let register = false;

  const handleGoBack = () => {
    register = false;
  };

  const handleRegister = () => {
    register = true;
  };
</script>

{#if register}
  <Register on:goBack={handleGoBack} />
{:else}
  <Login on:toRegister={handleRegister} />
{/if}

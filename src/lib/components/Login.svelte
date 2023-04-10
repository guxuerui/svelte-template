<script lang="ts">
  import { authStore, authHandlers } from "$lib/stores/authStore";
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";
  import AuthReset from "./AuthReset.svelte";

  const dispatch = createEventDispatcher();

  let email = "";
  let password = "";
  let reset = false;

  async function handleLogin() {
    if (!email || !password) {
      throw new Error("参数不全!!");
    }
    try {
      await authHandlers.login(email, password);

      if ($authStore.currentUser) {
        email = "";
        password = "";
        alert("登录成功!");
        goto("/about");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const toRegister = () => {
    dispatch("toRegister");
  };
</script>

<div class="flex flex-col items-center justify-center">
  <form class="bg-white dark:bg-gray-800 shadow-md rounded-lg pa-6 mb-4 w-lg">
    <h1 my-0 text-gray-600 dark:text-gray-200>登录</h1>
    <div class="mb-6 mr-6 mt-6">
      <label
        for="input-group-1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >邮箱</label
      >
      <input
        bind:value={email}
        type="email"
        id="input-group-1"
        class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="name@gmail.com"
      />
    </div>
    <div class="mb-6 mr-6">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >密码</label
      >
      <input
        bind:value={password}
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="请输入密码"
        required
      />
    </div>
    <div class="flex justify-between">
      <div text-gray-900 dark:text-white>
        还没有账号?
        <button
          on:click={toRegister}
          class="border-2 border-l-0 border-t-0 border-r-0 border-blue-200 hover:border-b-blue-700 dark:hover:border-b-blue-500 transition-colors bg-transparent text-gray-900 dark:text-white cursor-pointer"
        >
          点击注册
        </button>
      </div>
      <div text-gray-900 dark:text-white>
        <button
          class="border-2 border-l-0 border-t-0 border-r-0 border-blue-200 hover:border-b-blue-700 dark:hover:border-b-blue-500 transition-colors bg-transparent text-gray-900 dark:text-white cursor-pointer"
          on:click={() => {
            reset = true;
          }}
        >
          忘记密码?
        </button>
      </div>
    </div>

    <div class="register-btn flex items-center justify-center mt-7">
      <button
        on:click={handleLogin}
        type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer w-40"
      >
        登录
      </button>
    </div>
  </form>
</div>

{#if reset}
  <div
    id="small-modal"
    tabindex="-1"
    class="fixed top-0 left-0 z-50 p-4 w-full h-full bg-gray-800/80"
  >
    <div class="min-w-2xl max-w-md h-auto mx-auto mt-10">
      <div class="bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          class="border-0 cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors float-right ma-2"
          data-modal-hide="small-modal"
          on:click={() => {
            reset = false;
          }}
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
          >
          <span class="sr-only">Close modal</span>
        </button>
        <div class="pa-6 border-b rounded-t dark:border-gray-600">
          <AuthReset />
        </div>
      </div>
    </div>
  </div>
{/if}

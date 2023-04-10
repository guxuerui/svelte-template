<script lang="ts">
  import { authStore, authHandlers } from "$lib/stores/authStore";
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";

  const dispatch = createEventDispatcher();

  let email = "";
  let password = "";
  let confirmPassword = "";

  async function handleSubmit() {
    if (!email || !password || !confirmPassword) {
      throw new Error("参数不全!!");
    }

    if (password === confirmPassword) {
      try {
        await authHandlers.signup(email, password);

        if ($authStore.currentUser) {
          alert("注册成功!");
          email = "";
          password = "";
          confirmPassword = "";
          goto("/about");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error("两次密码输入不一致!!");
    }
  }

  function goBack() {
    dispatch("goBack");
  }
</script>

<div class="flex flex-col items-center justify-center">
  <form
    class="bg-white dark:bg-gray-800 shadow-md rounded-lg pa-6 mb-4 w-lg relative"
  >
    <button
      on:click={goBack}
      type="button"
      class="border-0 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 absolute top-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-3 h-3 -mr-1"
        fill="currentColor"
        viewBox="0 0 32 32"
        ><path
          fill="currentColor"
          d="m14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16l10 10z"
        /></svg
      >
    </button>
    <h1 my-0 text-gray-600 dark:text-gray-200>注册</h1>
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
    <div class="mb-6 mr-6">
      <label
        for="confirm_password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >确认密码</label
      >
      <input
        bind:value={confirmPassword}
        type="password"
        id="confirm_password"
        class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="请确认密码"
        required
      />
    </div>
    <div class="register-btn flex items-center justify-center">
      <button
        on:click={handleSubmit}
        on:keydown={handleSubmit}
        type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer w-40"
      >
        提交
      </button>
    </div>
  </form>
</div>

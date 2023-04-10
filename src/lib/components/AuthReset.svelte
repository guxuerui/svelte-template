<script lang="ts">
  import { authHandlers } from "$lib/stores/authStore";
  let action = "";
  let email = "";
  let password = "";
  let showError = false;

  function handleClose() {
    action = "";
    email = "";
    password = "";
    showError = false;
  }

  async function handleSubmit() {
    if (
      (action === "updateEmail" && !email) ||
      (action == "updatePassword" && !password)
    ) {
      showError = true;
      return;
    }

    if (action === "updateEmail") {
      return await authHandlers.updateEmail(email);
    }

    if (action === "updatePassword") {
      return await authHandlers.updatePassword(password);
    }
  }
</script>

<div class="register-btn flex items-center justify-center mt-7">
  <button
    type="button"
    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer"
    on:click={() => {
      action = "updateEmail";
    }}
  >
    更新邮箱
  </button>
  <button
    type="button"
    class="border-0 cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    on:click={() => {
      action = "updatePassword";
    }}
  >
    更新密码
  </button>
</div>

{#if action}
  <div class="flex flex-col items-center justify-center mt-6">
    <form class="bg-white dark:bg-gray-800 shadow-md rounded-lg pa-6 mb-4 w-lg">
      {#if action === "updateEmail"}
        <div class="mb-6 mr-6">
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
        {#if showError}
          <div class="text-xs text-#fa3000">邮箱不能为空!</div>
        {/if}
      {/if}
      {#if action === "updatePassword"}
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
        {#if showError}
          <div class="text-xs text-#fa3000">密码不能为空!</div>
        {/if}
      {/if}

      <div class="register-btn flex items-center justify-center mt-7">
        <button
          type="button"
          class="border-0 cursor-pointer text-white bg-gradient-to-r from-green-500 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-30"
          on:click={handleClose}
        >
          关闭
        </button>

        <button
          type="button"
          class="border-0 cursor-pointer text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-30"
          on:click={handleSubmit}
        >
          提交
        </button>
      </div>
    </form>
  </div>
{/if}

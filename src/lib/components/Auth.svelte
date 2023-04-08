<script lang="ts">
  import { goto } from "$app/navigation";
  import type { User } from "$types/index";

  let loginForm: User = {
    email: "",
    password: "",
  };
  function submit() {
    console.log(loginForm);
    if (!loginForm["email"] || !loginForm["password"]) {
      throw new Error("参数不全!!");
    }
    alert("登录成功!");
    Object.keys(loginForm).forEach((key) => {
      // @ts-expect-error required
      loginForm[key] = "";
    });
    goto("/about");
  }
</script>

<div class="flex flex-col items-center justify-center">
  <form class="bg-white dark:bg-gray-800 shadow-md rounded-lg pa-6 mb-4 w-lg">
    <h1 text-gray-600 dark:text-gray-200>登录</h1>
    <div class="mb-6 mr-6">
      <label
        for="input-group-1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >邮箱</label
      >
      <input
        bind:value={loginForm.email}
        type="text"
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
        bind:value={loginForm.password}
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="请输入密码"
        required
      />
    </div>
    <div class="register-btn flex items-center justify-center">
      <button
        on:click={submit}
        type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium border-0 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer w-40"
      >
        登录
      </button>
    </div>
  </form>
</div>

<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { get, set, setMany, getMany, update, del, delMany, clear, entries, keys, values } from "idb-keyval";

  let storeVal: any = "";

  function setVal() {
    set("framwork", "svelte(kit)")
      .then(() => console.log("It finished!"))
      .catch((err) => console.log("It failed!", err));
  }

  function setManyVal() {
    setMany([["hello", "world"], ["framwork", "svelte(kit)"],])
      .then(() => console.log("Set many finished!"))
      .catch((err) => console.log("It failed!", err));
  }

  function getVal() {
    get("hello").then((val) => (storeVal = val));
  }

  function getManyVal() {
    getMany(["hello", 'framwork']).then(([firstVal, secondVal]) =>
      storeVal = firstVal + ' - ' + secondVal
    );
  }

  function updateHello() {
    update("hello", (val) => val.toUpperCase())
    getVal()
  }

  function entriesVal() {
    entries().then((entries) => storeVal = entries);
  }
</script>

<h1>ibb-keyval</h1>

<div flex="~ gap-x-4">
  <button on:click|preventDefault={setVal} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">set svelte</button>
  <button on:click|preventDefault={setManyVal} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">set hello and svelte</button>
  <button on:click|preventDefault={getVal} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">get hello</button>
  <button on:click|preventDefault={getManyVal} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">get hello and svelte</button>
  <button on:click|preventDefault={updateHello} hover="cursor-pointer" type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">update hello</button>
  <button on:click|preventDefault={() => del("hello")} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">del hello</button>
  <button on:click|preventDefault={() => clear()} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">clear all</button>
  <button on:click|preventDefault={entriesVal} hover="cursor-pointer" type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">entries all</button>
</div>

{#if storeVal}
  <p in:fade text="2rem teal">storVal: {storeVal}</p>
{:else}
  <p in:fly text="3rem orange">查无结果</p>
{/if}
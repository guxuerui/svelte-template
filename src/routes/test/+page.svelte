<script lang="ts">
  import Thing from "./Thing.svelte";
  import type { CatsType } from "$types/index";
  import useFetchUsers from "./useFetchUsers";
  import Box from "$lib/components/Box.svelte";
  import Todo from "$lib/components/Todo.svelte";
  import autosize from "svelte-autosize";
  import { clipboard } from "$lib/actions/clipboard";

  // export let data: any;
  // Fetch data
  let countValue: any;
  const { isLoading, error, data: users } = useFetchUsers();
  users.subscribe((value) => {
    countValue = value;
  });

  // 渲染html
  const string = `here's some <strong>HTML!!!</strong>`;

  const user = { loggedIn: false };
  function toggle() {
    user.loggedIn = !user.loggedIn;
  }

  let x = 17;

  // Each blocks
  const cats: CatsType[] = [
    { id: "J---aiyznGQ", name: "Keyboard Cat" },
    { id: "z_AbfPXTKms", name: "Maru" },
    { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
  ];
  const cards = [
    {
      id: 1,
      href: "https://github.com",
      title: "github",
      body: "Learn use github",
    },
    {
      id: 2,
      href: "https://github.com",
      title: "github",
      body: "Learn use github",
    },
    {
      id: 3,
      href: "https://github.com",
      title: "github",
      body: "Learn use github",
    },
    {
      id: 4,
      href: "https://github.com",
      title: "github",
      body: "Learn use github",
    },
  ];

  // Keyed each blocks
  let things: Required<Pick<CatsType, "id" | "color">[]> = [
    { id: 1, color: "darkblue" },
    { id: 2, color: "indigo" },
    { id: 3, color: "deeppink" },
    { id: 4, color: "salmon" },
    { id: 5, color: "gold" },
  ];
  function handleClick() {
    things = things.slice(1);
  }
  // await blocks
  async function getRandomNumber() {
    const res = Math.floor(Math.random() * 20) + 1;
    // const text = await res.text()
    // if (res.ok) return text
    // else throw new Error(text)
    return res;
  }
  let promise = getRandomNumber();
  function clickBtn() {
    promise = getRandomNumber();
  }
  // Dom Events
  let m = { x: 0, y: 0 };
  function handleMouseMove(event: MouseEvent) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
  // select
  let selectedColorId = 2;

  const colors = [
    { id: 1, text: "red" },
    { id: 2, text: "blue" },
    { id: 3, text: "green" },
    { id: 4, text: "gray", isDisabled: true },
  ];

  // Each block bindings
  let todos = [
    { done: false, text: "finish Svelte tutorial" },
    { done: false, text: "build an app" },
    { done: false, text: "world domination" },
  ];

  function add() {
    todos = todos.concat({ done: false, text: "" });
  }

  function clear() {
    todos = todos.filter((t) => !t.done);
  }

  $: remaining = todos.filter((t) => !t.done).length;

  let textareaValue = "I am an textarea";

  // input value
  let value = "Hello World";

  let isOpen = false;
</script>

<svelte:head>
  <title>Test</title>
  <meta name="description" content="My test page" />
</svelte:head>

<div class="text-column">
  <h1>Case1</h1>
  <div border="1 dashed pink" pa-4 text-orange data-clipboard="exampleElement">
    {textareaValue}
  </div>

  <button
    my-4
    use:clipboard={{
      element: "exampleElement",
      fn: () => console.log("copied html!"),
    }}>Copy Html</button
  >

  <h1>Case2</h1>
  <input type="text" bind:value data-clipboard="exampleInput" />

  <button
    use:clipboard={{
      input: "exampleInput",
      fn: () => console.log("copied input value!"),
    }}>Copy Input Value</button
  >

  <h1>Case3</h1>
  <button my-4 use:clipboard={{ value, fn: () => console.log("copied!") }}
    >COPY normal value</button
  >
  <details bind:open={isOpen}>
    <summary>Details</summary>
    <p>Something small enough to escape casual notice.</p>
  </details>

  <input type="radio" bind:group={value} value="Plain" />
  <input type="radio" bind:group={value} value="Whole wheat" />
  <input type="radio" bind:group={value} value="Spinach" />

  <input
    on:input={() => console.log("Old value:", value)}
    bind:value
    on:input={() => console.log("New value:", value)}
  />

  <h1 text="teal 6xl" border="1 dashed pink">Autosize Textarea</h1>
  <textarea class="pa-2" use:autosize bind:value={textareaValue} />
  <h1 class="text-#1DBfff">My test page</h1>
  <p class="text-orange text-2rem ma-0">{@html string}</p>

  <!-- if/else -->
  {#if user.loggedIn}
    <button
      class="text-white py-2 border-0 bg-green-500 cursor-pointer"
      on:click={toggle}>Log out</button
    >
  {:else}
    <button
      class="text-white py-2 border-0 bg-orange cursor-pointer"
      on:click={toggle}>Log in</button
    >
  {/if}

  <!-- if/else if/else -->
  <input
    class="h-2rem mt-4 border-0 px-2"
    bind:value={x}
    placeholder="enter your age"
  />
  {#if x > 10}
    <p class="text-purple-500 text-2rem my-4">{x} is greater than 10</p>
  {:else if 5 > x}
    <p class="text-blue-500 text-2rem my-4">{x || 0} is less than 10</p>
  {:else}
    <p class="text-green-500 text-2rem my-4">{x} is between 5 and 10</p>
  {/if}

  <!-- Each blocks -->
  <h1>The Famous Cats of YouTube</h1>
  <ul class="mt-0">
    {#each cats as { id, name }, i}
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/watch?v={id}">{i + 1}: {name}</a
        >
      </li>
    {/each}
  </ul>

  <h1 class="text-left">Keyed each blocks and inline handlers</h1>
  <button
    class="py-3 bg-green-400 text-white border-0 cursor-pointer hover:bg-green-500"
    on:click={handleClick}
  >
    Remove first thing
  </button>
  <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em">
    <div>
      <h2>Keyed</h2>
      {#each things as thing (thing.id)}
        <Thing
          current={thing.color}
          on:message={(e) => console.log(e.detail.text)}
        />
      {/each}
    </div>

    <div>
      <h2>Unkeyed</h2>
      {#each things as thing}
        <Thing current={thing.color} />
      {/each}
    </div>
  </div>

  <h1 class="text-left" text-emerald>await blocks</h1>
  <button
    class="py-3 bg-pink-400 text-white border-0 cursor-pointer hover:bg-pink-500"
    on:click|once={clickBtn}
  >
    generate random number
  </button>

  {#await promise}
    <p>...waiting</p>
  {:then number}
    <p>The number is {number}</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

  <h1 class="text-left">Dom Events</h1>
  <div
    class="text-purple-500 text-2rem font-bold w-full h-10rem"
    on:mousemove={handleMouseMove}
  >
    The mouse position is {m.x} x {m.y}
  </div>

  <h1>Select</h1>
  当前选中的color: {selectedColorId}
  <select bind:value={selectedColorId}>
    {#each colors as color}
      <option value={color.id} disabled={color.isDisabled}>
        {color.text}
      </option>
    {/each}
  </select>

  <h1>Fetch Data</h1>
  <div>
    {#if $isLoading}
      <p>Fetching users...</p>
    {:else if $error}
      <p>An error occured while fetching users</p>
    {:else if $users}
      <ul>
        {#each countValue as user}
          <li>
            <img src={user.picture.thumbnail} alt="user" />
            <p>
              {user.name.first}-
              {user.name.last}
            </p>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <h1>Cards</h1>
  <ul class="link-card-grid">
    {#each cards as card}
      <li class="link-card">
        <a target="_blank" rel="noreferrer" href={card.href}>
          <h2>
            {card.title}
            <span>&rarr;</span>
          </h2>
          <p class:active={card.id === 1}>
            {card.body}
          </p>
        </a>
      </li>
    {/each}
  </ul>

  <div class="ma-2 pa-4 border-2 border-dashed border-teal">
    <h1>Todos</h1>
    {#each todos as todo}
      <div>
        <input type="checkbox" bind:checked={todo.done} />

        <input
          placeholder="What needs to be done?"
          bind:value={todo.text}
          disabled={todo.done}
        />
      </div>
    {/each}

    <p>{remaining} remaining</p>

    <button on:click={add}> Add new </button>

    <button on:click={clear}> Clear completed </button>
  </div>

  <h1>Slots</h1>

  <Box />
  <Box>I am a slot. Not default messages.</Box>

  <h1>The animate directive -- Todo</h1>
  <Todo />
</div>

<style>
  :root {
    --accent: 124, 58, 237;
    --accent-gradient: linear-gradient(
      45deg,
      rgb(var(--accent)),
      #da62c4 30%,
      white 60%
    );
  }
  .link-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
    gap: 1rem;
    padding: 0;
  }
  .link-card {
    list-style: none;
    display: flex;
    padding: 0.25rem;
    background-color: white;
    background-image: none;
    background-size: 400%;
    border-radius: 0.6rem;
    background-position: 100%;
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  .link-card > a {
    width: 100%;
    text-decoration: none;
    line-height: 1.4;
    padding: 1rem 1.3rem;
    border-radius: 0.35rem;
    color: #111;
    background-color: white;
    opacity: 0.8;
  }
  .active {
    color: purple;
  }
  h2 {
    margin: 0;
    font-size: 1.25rem;
    transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  p {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: #444;
  }
  .link-card:is(:hover, :focus-within) {
    background-position: 0;
    background-image: var(--accent-gradient);
  }
  .link-card:is(:hover, :focus-within) h2 {
    color: rgb(var(--accent));
  }
</style>

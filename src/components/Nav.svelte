<script lang="ts">
  import { type RouterItf } from "../stores/RouteStore.svelte";

  let { router }: RouterItf = $props();

  let isOpen = $state<boolean>(false);
  function toggleIsOpen() {
    isOpen = !isOpen;
  }

  function navigateTo(
    e: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }
  ) {
    e.preventDefault();
    const ele = e.target as HTMLElement;
    router.changeRoute(ele.innerText);
    toggleIsOpen();
  }
</script>

<header class="app-header">
  <nav class="top-nav">
    <div class="nav-addon">
      <h2>Habilog</h2>
      <button
        aria-label="dropdown"
        onclick={toggleIsOpen}
        class="dropdown-toggler"
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
    <ul class="nav-menu {isOpen ? '' : 'hidden'}">
      <li>
        <a href="/" class="nav-link" onclick={navigateTo}>Home</a>
      </li>
      <li>
        <a href="/about" class="nav-link" onclick={navigateTo}>FAG</a>
      </li>
      <li>
        <a href="/about" class="nav-link" onclick={navigateTo}>SISR</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  .nav-addon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dropdown-toggler {
    background: none;
    border: none;
  }
  .dropdown-toggler > div {
    width: 30px;
    height: 3px;
    background-color: var(--sub-title);
    margin: 6px 0;
  }
  .top-nav {
    display: flex;
    flex-direction: column;
    margin-inline: 1rem;
  }
  .app-header {
    width: 100%;
  }
  .nav-menu {
    list-style: none;
    padding-left: 0;
    margin: 0;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }
  .nav-link {
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
</style>

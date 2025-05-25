<script lang="ts">
  import { type RouterItf } from "../stores/RouteStore.svelte";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import GithubIcon from "./GithubIcon.svelte";
  import LinkedinIcon from "./LinkedinIcon.svelte";

  let { router }: { router: RouterItf } = $props();

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
    <Collapsible.Root>
      <div class="nav-addon">
        <h2>Habilog</h2>
        <div class="socmed-container">
          <a
            href="https://github.com/HabilAmardias"
            class="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
          <a
            class="nav-link"
            href="https://www.linkedin.com/in/muhammad-habil-amardias/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </a>
        </div>
        <Collapsible.Trigger>
          <div class="burger"></div>
          <div class="burger"></div>
          <div class="burger"></div>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <a href="/" class="nav-link" onclick={navigateTo}>Home</a>
      </Collapsible.Content>
      <Collapsible.Content>
        <a href="/" class="nav-link" onclick={navigateTo}>About</a>
      </Collapsible.Content>
      <Collapsible.Content></Collapsible.Content>
    </Collapsible.Root>
  </nav>
</header>

<style>
  .nav-addon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .burger {
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
    margin-top: 1rem;
  }
  .nav-link {
    text-decoration: none;
    color: var(--text);
  }
  .nav-link:hover {
    color: var(--sub-title);
  }
  .socmed-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>

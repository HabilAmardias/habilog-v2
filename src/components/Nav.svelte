<script lang="ts">
  import { type RouterItf } from "../stores/RouteStore.svelte";
  import * as Collapsible from "$lib/components/ui/collapsible";
  import GithubIcon from "./GithubIcon.svelte";
  import LinkedinIcon from "./LinkedinIcon.svelte";

  let { router }: { router: RouterItf } = $props();

  let isOpen = $state<boolean>(false);
  let mobileWindow = $state<boolean>(window.innerWidth < 1024);

  $effect(() => {
    function handleWindowSize() {
      mobileWindow = window.innerWidth < 1024;
    }
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  });

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
        <h1>Habilog</h1>
        <div class={mobileWindow ? "hidden" : "nav-content"}>
          <a href="/" class="nav-link" onclick={navigateTo}>Home</a>
          <a href="/" class="nav-link" onclick={navigateTo}>About</a>
        </div>
        <div class={mobileWindow ? "hidden" : "socmed-container"}>
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
        <Collapsible.Trigger class={mobileWindow ? "nav-content" : "hidden"}>
          <div class="burger"></div>
          <div class="burger"></div>
          <div class="burger"></div>
        </Collapsible.Trigger>
      </div>
      <div class={mobileWindow ? "nav-content" : "hidden"}>
        <Collapsible.Content>
          <a href="/" class="nav-link" onclick={navigateTo}>Home</a>
        </Collapsible.Content>
        <Collapsible.Content>
          <a href="/" class="nav-link" onclick={navigateTo}>About</a>
        </Collapsible.Content>
        <Collapsible.Content>
          <div class={mobileWindow ? "socmed-container" : "hidden"}>
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
        </Collapsible.Content>
      </div>
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
  .nav-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .hidden {
    display: none;
  }
  @media only screen and (min-width: 1024px) {
    .nav-content {
      flex-direction: row;
      gap: 1rem;
      align-items: center;
    }
  }
</style>

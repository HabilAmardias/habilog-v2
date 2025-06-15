<script lang="ts">
  import Loading from "./components/Loading.svelte";
  import ErrorPage from "./components/ErrorPage.svelte";
  import PageLayout from "./layouts/PageLayout.svelte";
</script>

{#snippet MainContent(routeState: string, navigateToHome: () => void)}
  {#if routeState === "Home"}
    {#await import("./pages/Home.svelte")}
      <Loading />
    {:then Home}
      <Home.default {navigateToHome} />
    {/await}
  {:else if routeState === "About"}
    {#await import("./pages/About.svelte")}
      <Loading />
    {:then About}
      <About.default />
    {/await}
  {:else}
    <ErrorPage navigate={navigateToHome} message="Page Not Found" />
  {/if}
{/snippet}

<PageLayout {MainContent} />

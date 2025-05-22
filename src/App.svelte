<script lang="ts">
  import Footer from "./components/Footer.svelte";
  import Home from "./components/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import router from "./stores/RouteStore.svelte";
  import SISR from "./components/SISR.svelte";
  import ErrorPage from "./components/ErrorPage.svelte";
  import Fag from "./components/FAG.svelte";
</script>

<div class="container">
  <Nav {router} />
  <main class="main-content">
    {#if router.routeState === "Home"}
      <Home {router} />
    {:else if router.routeState === "SISR"}
      <SISR />
    {:else if router.routeState === "FAG"}
      <Fag />
    {:else}
      <ErrorPage {router} message="Page Not Found" />
    {/if}
  </main>
  <Footer />
</div>

<style>
  .container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    margin-inline: 1rem;
    height: 100%;
    gap: 2rem;
  }
</style>

<script lang="ts">
  import Footer from "./components/Footer.svelte";
  import Home from "./components/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import router from "./stores/RouteStore.svelte";
</script>

<div class="container">
  <Nav {router} />
  <main class="main-content">
    {#if router.routeState === "Home"}
      <Home {router} />
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
  }
  .main-content {
    display: flex;
    flex-direction: column;
    margin-inline: 1rem;
  }
</style>

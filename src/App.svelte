<script lang="ts">
  import "./app.css";
  // import "./main.css";
  import Footer from "./components/Footer.svelte";
  import Home from "./components/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import router from "./stores/RouteStore.svelte";
  import ErrorPage from "./components/ErrorPage.svelte";
  import CarouselNavigator from "./stores/CarouselNavStore.svelte";
  import About from "./components/About.svelte";

  function navigateToHome() {
    router.changeRoute("Home");
  }
</script>

<div class="container">
  <Nav {router} />
  <main class="main-content">
    {#if router.routeState === "Home"}
      <Home {CarouselNavigator} />
    {:else if router.routeState === "About"}
      <About />
    {:else}
      <ErrorPage navigate={navigateToHome} message="Page Not Found" />
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
    flex: 0 1 100%;
    gap: 2rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .main-content::-webkit-scrollbar {
    display: none;
  }
</style>

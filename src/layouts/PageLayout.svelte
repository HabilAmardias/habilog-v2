<script lang="ts">
  import "../app.css";
  import Nav from "../components/Nav/Nav.svelte";
  import Footer from "../components/Footer/Footer.svelte";
  import type { Snippet } from "svelte";

  let {
    MainContent,
  }: {
    MainContent: Snippet<[string, () => void]>;
  } = $props();

  class Router {
    routeState = $state<string>("Home");
    constructor() {
      const route = localStorage.getItem("route");
      if (route) {
        this.routeState = route;
      }
    }
    changeRoute(newRoute: string) {
      localStorage.setItem("route", newRoute);
      this.routeState = newRoute;
    }
  }
  let router = new Router();

  function navigateToHome() {
    if (router.routeState === "Home") {
      window.location.reload();
    } else {
      router.changeRoute("Home");
    }
  }

  function changeRoute(newRoute: string) {
    router.changeRoute(newRoute);
  }
</script>

<div class="container">
  <Nav {changeRoute} />
  <main class="main-content">
    {@render MainContent(router.routeState, navigateToHome)}
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

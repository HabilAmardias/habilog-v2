<script lang="ts">
  import "./app.css";
  import About from "./components/About.svelte";
  import Footer from "./components/Footer.svelte";
  import Home from "./components/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import router from "./stores/RouteStore.svelte";
</script>

<div class="container">
  <Nav {router} />
  <main class="main-content">
    {#if router.routeState === "Home"}
      <Home />
    {:else if router.routeState === "About"}
      <About />
    {/if}
  </main>
  <Footer />
</div>

<style>
  @font-face {
    font-family: "Poppins";
    src: url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
  }

  .container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    font-family: "Poppins", sans-serif;
    flex-direction: column;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    margin-inline: 1rem;
  }
</style>

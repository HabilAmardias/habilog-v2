<script lang="ts">
  import type { RouterItf } from "../stores/RouteStore.svelte";

  let { message, router }: { message: string; router: RouterItf } = $props();
</script>

<section class="error-section">
  <h1>Error: {message}</h1>
  <p>
    Want to go home?
    <button onclick={() => router.changeRoute("Home")}> Click Here! </button>
  </p>
</section>

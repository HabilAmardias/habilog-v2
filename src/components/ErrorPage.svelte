<script lang="ts">
  let { message, navigate }: { message: string; navigate: () => void } =
    $props();
</script>

<section class="error-section">
  <h1>Error: {message}</h1>
  <p>
    Want to go home?
    <button class="nav-link" onclick={navigate}> Click Here! </button>
  </p>
</section>

<style>
  .error-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex: 0 1 100%;
  }
  .error-section > h1,
  p {
    text-align: center;
  }
  .nav-link {
    color: var(--sub-title);
  }
  .nav-link:hover {
    color: var(--text);
  }
</style>

<script lang="ts">
  let { message, navigate }: { message: string; navigate: () => void } =
    $props();
</script>

<section class="error-section">
  <h1>Error: {message}</h1>
  <p>
    Want to go home?
    <button onclick={navigate}> Click Here! </button>
  </p>
</section>

<style>
  .error-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
</style>

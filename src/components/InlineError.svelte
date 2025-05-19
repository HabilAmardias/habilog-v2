<script lang="ts">
  const { message }: { message: string } = $props();
</script>

<p class="error-message">{message}</p>

<style>
  .error-message {
    color: red;
    text-align: center;
  }
</style>

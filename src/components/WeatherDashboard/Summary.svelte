<script lang="ts">
  let { title, data }: { title: string; data: number } = $props();
</script>

<div class="container">
  <h4 class="text-center">{title}</h4>
  <h4 class="text-center data">{data}</h4>
</div>

<style>
  .text-center {
    text-align: center;
  }
  .container {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--app-container);
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
  .data {
    color: var(--text);
  }
</style>

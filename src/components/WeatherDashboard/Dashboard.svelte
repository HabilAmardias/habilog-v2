<script lang="ts">
  import Historical from "./Historical.svelte";
  import Statistics from "./Statistics.svelte";

  let { navigate }: { navigate: () => void } = $props();
  let opt = $state<string>("Historical");
</script>

<div class="opts-container">
  <select class="option-dropdown" bind:value={opt} name="year" id="">
    <option value="Historical">Historical</option>
    <option value="Statistic">Statistic</option>
  </select>
</div>

{#if opt === "Historical"}
  <Historical {navigate} />
{:else if opt === "Statistic"}
  <Statistics {navigate}/>
{/if}

<style>
  .option-dropdown {
    background-color: var(--app-container);
    color: var(--sub-title);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>

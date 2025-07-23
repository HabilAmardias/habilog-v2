<script lang="ts">
  import Forecast from "./Forecast.svelte";
  import Historical from "./Historical.svelte";
  import Statistics from "./Statistics.svelte";
  import { uiState } from "./weatherUiState.svelte";

  let { navigate }: { navigate: () => void } = $props();

</script>

<div class="opts-container">
  <select class="option-dropdown" bind:value={uiState.opt} name="year" id="">
    <option value="Historical">Historical</option>
    <option value="Statistic">Statistic</option>
    <option value="Forecast">Forecast</option>
  </select>
</div>

{#if uiState.opt === "Historical"}
  <Historical {navigate} uiState={uiState} />
{:else if uiState.opt === "Statistic"}
  <Statistics {navigate} uiState={uiState}/>
{:else if uiState.opt === "Forecast"}
  <Forecast {navigate} uiState={uiState}/>
{/if}

<style>
  .option-dropdown {
    background-color: var(--app-container);
    color: var(--sub-title);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>

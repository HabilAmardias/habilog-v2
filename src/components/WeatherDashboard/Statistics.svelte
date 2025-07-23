<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";
  import type { StatisticUIState } from "./weatherUiState.svelte";

  let { navigate, uiState }: { navigate: () => void, uiState: StatisticUIState } = $props();
  onMount(() => {
    uiState.getStatistic()
    .then(val => uiState.setStatistic(val.data))
    .catch((err: Error) => uiState.setError(err))
    .finally(()=> uiState.stopLoading())
  });
</script>

{#if uiState.isLoading}
  <Loading />
{:else if uiState.isError}
  <ErrorPage message={uiState.isError.message} {navigate} />
{:else if uiState.statisticData}
  <div class="charts-container">
    <Plot
      type="bar"
      label="temperature"
      data={$state.snapshot(uiState.statisticData.temperature_acf)}
      labels={Array(uiState.statisticData.temperature_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
      color="red"
    />
    <Plot
      type="bar"
      label="apparent_temperature"
      data={$state.snapshot(uiState.statisticData.apparent_temperature_acf)}
      labels={Array(uiState.statisticData.apparent_temperature_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
      color="red"
    />
    <Plot
      type="bar"
      label="wind_gusts"
      data={$state.snapshot(uiState.statisticData.wind_gusts_acf)}
      labels={Array(uiState.statisticData.wind_gusts_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
      color="red"
    />
    <Plot
      type="bar"
      label="wind_speed"
      data={$state.snapshot(uiState.statisticData.wind_speed_acf)}
      labels={Array(uiState.statisticData.wind_speed_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
      color="red"
    />
    <Plot
      type="bar"
      label="rain_sum"
      data={$state.snapshot(uiState.statisticData.rain_sum_acf)}
      labels={Array(uiState.statisticData.rain_sum_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
      color="red"
    />
    <Plot
      type="bar"
      label="relative_humidity"
      data={$state.snapshot(uiState.statisticData.relative_humidity_acf)}
      labels={Array(uiState.statisticData.relative_humidity_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
      color="red"
    />
  </div>
{/if}

<style>
  .charts-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>

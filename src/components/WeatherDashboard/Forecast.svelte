<script lang="ts">
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";
  import { TimestampToDate } from "./helper";
  import type { ForecastUIState } from "./weatherUiState.svelte";
  
  let { navigate, uiState }: { navigate: () => void, uiState: ForecastUIState } = $props();

  $effect(() => {
    
    uiState.getForecast()
      .then((val) => {
        uiState.setForecast(val.data)
      })
      .catch((err: Error) => uiState.setError(err))
      .finally(() => uiState.stopLoading());
  });
</script>

{#if uiState.isLoading}
  <Loading />
{:else if uiState.isError}
  <ErrorPage message={uiState.isError.message} {navigate} />
{:else if uiState.forecastData}
  <div class="charts-container">
    <Plot
      type="line"
      label="temperature_forecast"
      data={$state.snapshot(uiState.forecastData.temperature)}
      labels={$state
        .snapshot(uiState.forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="green"
    />
    <Plot
      type="line"
      label="apparent_temperature_forecast"
      data={$state.snapshot(uiState.forecastData.apparent_temperature)}
      labels={$state
        .snapshot(uiState.forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="green"
    />
    <Plot
      type="line"
      label="rain_intensity_forecast"
      data={$state.snapshot(uiState.forecastData.rain_sum)}
      labels={$state
        .snapshot(uiState.forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="green"
    />
    <Plot
      type="line"
      label="humidity_forecast"
      data={$state.snapshot(uiState.forecastData.relative_humidity)}
      labels={$state
        .snapshot(uiState.forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="green"
    />
    <Plot
      type="line"
      label="wind_gusts_forecast"
      data={$state.snapshot(uiState.forecastData.wind_gusts)}
      labels={$state
        .snapshot(uiState.forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="green"
    />
    <Plot
      type="line"
      label="wind_speed_forecast"
      data={$state.snapshot(uiState.forecastData.wind_speed)}
      labels={$state
        .snapshot(uiState.forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="green"
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

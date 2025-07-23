<script lang="ts">
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";
  import Summary from "./Summary.svelte";
  import { Months } from "../../constant";
  import type { HistoricalUIState } from "./weatherUiState.svelte";
  import { TimestampToDate } from "./Helper";
  
  let {navigate, uiState} : {navigate : () => void, uiState: HistoricalUIState} = $props()

  $effect(() => {
    uiState.getHistoricalData()
    .then((val) => {
      uiState.setWeatherData(val.res.data)
      uiState.setOption(val.opt.data)
    })
    .catch((err : Error) => {
      uiState.setError(err)
    })
    .finally(()=>{
      uiState.stopLoading()
    })
  });
</script>

{#if uiState.isLoading}
  <Loading />
{:else if uiState.isError}
  <ErrorPage message={uiState.isError.message} {navigate} />
{:else if uiState.weatherData && uiState.opts}
  <div class="opts-container">
    <select class="option-dropdown" bind:value={uiState.month} name="month" id="">
      {#each uiState.opts.months as Month}
        <option value={Month}>{Months[Month - 1]}</option>
      {/each}
    </select>
    <select class="option-dropdown" bind:value={uiState.year} name="year" id="">
      {#each uiState.opts.years as Year}
        <option value={Year}>{Year}</option>
      {/each}
    </select>
  </div>
  <div class="summary-container">
    <Summary
      title="Monthly Average Temperature"
      data={uiState.weatherData.monthly_average_temperature}
    />
    <Summary
      title="Monthly Average Apparent Temperature"
      data={uiState.weatherData.monthly_average_apparent_temperature}
    />
    <Summary
      title="Monthly Average Rain Intensity"
      data={uiState.weatherData.monthly_average_rain_intensity}
    />
    <Summary
      title="Monthly Average Relative Humidity"
      data={uiState.weatherData.monthly_average_relative_humidity}
    />
  </div>
  <div class="charts-container">
    <Plot
      type="line"
      label="temperature"
      data={$state.snapshot(uiState.weatherData.temperature)}
      labels={$state
        .snapshot(uiState.weatherData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="blue"
    />
    <Plot
      type="line"
      label="apparent_temperature"
      data={$state.snapshot(uiState.weatherData.apparent_temperature)}
      labels={$state
        .snapshot(uiState.weatherData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="blue"
    />
    <Plot
      type="line"
      label="rain_intensity"
      data={$state.snapshot(uiState.weatherData.rain_sum)}
      labels={$state
        .snapshot(uiState.weatherData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="blue"
    />
    <Plot
      type="line"
      label="humidity"
      data={$state.snapshot(uiState.weatherData.relative_humidity)}
      labels={$state
        .snapshot(uiState.weatherData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="blue"
    />
    <Plot
      type="line"
      label="wind_gusts"
      data={$state.snapshot(uiState.weatherData.wind_gusts)}
      labels={$state
        .snapshot(uiState.weatherData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="blue"
    />
    <Plot
      type="line"
      label="wind_speed"
      data={$state.snapshot(uiState.weatherData.wind_speed)}
      labels={$state
        .snapshot(uiState.weatherData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="blue"
    />
  </div>
{/if}

<style>
  .charts-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .summary-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .option-dropdown {
    background-color: var(--app-container);
    color: var(--sub-title);
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>

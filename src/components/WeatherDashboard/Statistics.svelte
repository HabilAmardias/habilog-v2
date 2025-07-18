<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";

  let { navigate }: { navigate: () => void } = $props();
  interface WeatherStatistic {
    temperature_acf: Array<number>;
    apparent_temperature_acf: Array<number>;
    wind_speed_acf: Array<number>;
    wind_gusts_acf: Array<number>;
    rain_sum_acf: Array<number>;
    relative_humidity_acf: Array<number>;
  }
  interface GetStatisticResponse {
    message: string;
    data: WeatherStatistic;
  }

  let statisticData = $state<WeatherStatistic | null>(null);
  let isError = $state<string>("");
  let isLoading = $state<boolean>(false);

  onMount(() => {
    async function getStatistic() {
      isLoading = true;
      const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data/statistics`;
      const res = await fetch(url);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail);
      }
      const result: GetStatisticResponse = await res.json();
      return result.data;
    }
    getStatistic()
      .then((val) => (statisticData = val))
      .catch((err: Error) => (isError = err.message))
      .finally(() => (isLoading = false));
  });
</script>

{#if isLoading}
  <Loading />
{:else if isError}
  <ErrorPage message={isError} {navigate} />
{:else if statisticData}
  <div class="charts-container">
    <Plot
      type="bar"
      label="temperature"
      data={$state.snapshot(statisticData.temperature_acf)}
      labels={Array(statisticData.temperature_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="bar"
      label="apparent_temperature"
      data={$state.snapshot(statisticData.apparent_temperature_acf)}
      labels={Array(statisticData.apparent_temperature_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="bar"
      label="wind_gusts"
      data={$state.snapshot(statisticData.wind_gusts_acf)}
      labels={Array(statisticData.wind_gusts_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="bar"
      label="wind_speed"
      data={$state.snapshot(statisticData.wind_speed_acf)}
      labels={Array(statisticData.wind_speed_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="bar"
      label="rain_sum"
      data={$state.snapshot(statisticData.rain_sum_acf)}
      labels={Array(statisticData.rain_sum_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="bar"
      label="relative_humidity"
      data={$state.snapshot(statisticData.relative_humidity_acf)}
      labels={Array(statisticData.relative_humidity_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
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

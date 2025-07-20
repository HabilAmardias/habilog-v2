<script lang="ts">
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";

  function TimestampToDate(time: Date | string) {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
  let { navigate }: { navigate: () => void } = $props();
  interface WeatherForecast {
    temperature: Array<number>;
    apparent_temperature: Array<number>;
    wind_speed: Array<number>;
    wind_gusts: Array<number>;
    time: Array<Date>;
    rain_sum: Array<number>;
    relative_humidity: Array<number>;
  }

  interface GetForecastResponse {
    message: string;
    data: WeatherForecast;
  }


  let forecastData = $state<WeatherForecast | null>(null);
  let isError = $state<string>("");
  let isLoading = $state<boolean>(false);

  $effect(() => {
    const getData = async () => {
      isLoading = true;
      const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data/forecasts`;
      const res = await fetch(url)
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail);
      }
      const data: GetForecastResponse = await res.json()
      return data
    };
    getData()
      .then((val) => {
        forecastData = val.data;
      })
      .catch((err: Error) => (isError = err.message))
      .finally(() => (isLoading = false));
  });
</script>

{#if isLoading}
  <Loading />
{:else if isError}
  <ErrorPage message={isError} {navigate} />
{:else if forecastData}
  <div class="charts-container">
    <Plot
      type="line"
      label="temperature_forecast"
      data={$state.snapshot(forecastData.temperature)}
      labels={$state
        .snapshot(forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="yellow"
    />
    <Plot
      type="line"
      label="apparent_temperature_forecast"
      data={$state.snapshot(forecastData.apparent_temperature)}
      labels={$state
        .snapshot(forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="yellow"
    />
    <Plot
      type="line"
      label="rain_intensity_forecast"
      data={$state.snapshot(forecastData.rain_sum)}
      labels={$state
        .snapshot(forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="yellow"
    />
    <Plot
      type="line"
      label="humidity_forecast"
      data={$state.snapshot(forecastData.relative_humidity)}
      labels={$state
        .snapshot(forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="yellow"
    />
    <Plot
      type="line"
      label="wind_gusts_forecast"
      data={$state.snapshot(forecastData.wind_gusts)}
      labels={$state
        .snapshot(forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="yellow"
    />
    <Plot
      type="line"
      label="wind_speed_forecast"
      data={$state.snapshot(forecastData.wind_speed)}
      labels={$state
        .snapshot(forecastData.time)
        .map((date) => TimestampToDate(date))}
      lollipop={false}
      color="yellow"
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

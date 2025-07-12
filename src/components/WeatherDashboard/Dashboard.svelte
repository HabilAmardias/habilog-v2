<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";

  let { navigate }: { navigate: () => void } = $props();

  interface WeatherData {
    monthly_average_temperature: number;
    monthly_average_apparent_temperature: number;
    monthly_average_rain_intensity: number;
    monthly_average_relative_humidity: number;
    temperature: Array<number>;
    apparent_temperature: Array<number>;
    wind_speed: Array<number>;
    wind_gusts: Array<number>;
    time: Array<string>;
    rain_sum: Array<number>;
    relative_humidity: Array<number>;
    temperature_acf: Array<number>;
    apparent_temperature_acf: Array<number>;
    wind_speed_acf: Array<number>;
    wind_gusts_acf: Array<number>;
    rain_sum_acf: Array<number>;
    relative_humidity_acf: Array<number>;
  }

  interface GetWeatherResponse {
    message: string;
    data: WeatherData;
  }

  let weatherData = $state<WeatherData | null>(null);
  let isError = $state<string>("");
  let isLoading = $state<boolean>(false);

  onMount(() => {
    const getData = async () => {
      isLoading = true;
      const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data`;
      const res = await fetch(url);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail);
      }
      const data: GetWeatherResponse = await res.json();
      return data;
    };
    getData()
      .then(async (val) => {
        weatherData = val.data;
      })
      .catch((err: Error) => (isError = err.message))
      .finally(() => (isLoading = false));
  });
</script>

{#if isLoading}
  <Loading />
{:else if isError}
  <ErrorPage message={isError} {navigate} />
{:else if weatherData}
  <div>
    <h3>{weatherData.monthly_average_temperature}</h3>
  </div>
  <div>
    <Plot
      type="line"
      label="apparent_temperature"
      data={$state.snapshot(weatherData.apparent_temperature)}
      labels={$state.snapshot(weatherData.time)}
    />
  </div>
{/if}

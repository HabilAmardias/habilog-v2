<script lang="ts">
  import Loading from "../Loading.svelte";
  import ErrorPage from "../ErrorPage.svelte";
  import Plot from "./Plot.svelte";
  import Summary from "./Summary.svelte";
  import { Months } from "../../constant";

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
    time: Array<Date>;
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

  interface TimesOpt {
    years: Array<number>;
    months: Array<number>;
  }

  interface GetTimesOptResponse {
    message: string;
    data: TimesOpt;
  }

  let weatherData = $state<WeatherData | null>(null);
  let opts = $state<TimesOpt | null>(null);
  let isError = $state<string>("");
  let isLoading = $state<boolean>(false);
  let year = $state<number>(new Date().getFullYear());
  let month = $state<number>(new Date().getMonth());

  $effect(() => {
    const getData = async () => {
      isLoading = true;
      const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data?month=${month}&year=${year}`;
      const optUrl = `${import.meta.env.VITE_BACKEND_URL}/weather-data/times`;
      const [dataRes, optRes] = await Promise.all([fetch(url), fetch(optUrl)]);
      if (!dataRes.ok) {
        const data = await dataRes.json();
        throw new Error(data.detail);
      }
      if (!optRes.ok) {
        const data = await optRes.json();
        throw new Error(data.detail);
      }
      const [res, opt] = await Promise.all([dataRes.json(), optRes.json()]);
      return {
        res: res as GetWeatherResponse,
        opt: opt as GetTimesOptResponse,
      };
    };
    getData()
      .then(async (val) => {
        weatherData = val.res.data;
        opts = val.opt.data;
      })
      .catch((err: Error) => (isError = err.message))
      .finally(() => (isLoading = false));
  });
</script>

{#if isLoading}
  <Loading />
{:else if isError}
  <ErrorPage message={isError} {navigate} />
{:else if weatherData && opts}
  <div class="opts-container">
    <select class="option-dropdown" bind:value={month} name="month" id="">
      {#each opts.months as month}
        <option value={month}>{Months[month - 1]}</option>
      {/each}
    </select>
    <select class="option-dropdown" bind:value={year} name="year" id="">
      {#each opts.years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>
  <div class="summary-container">
    <Summary
      title="Monthly Average Temperature"
      data={weatherData.monthly_average_temperature}
    />
    <Summary
      title="Monthly Average Apparent Temperature"
      data={weatherData.monthly_average_apparent_temperature}
    />
    <Summary
      title="Monthly Average Rain Intensity"
      data={weatherData.monthly_average_rain_intensity}
    />
    <Summary
      title="Monthly Average Relative Humidity"
      data={weatherData.monthly_average_relative_humidity}
    />
  </div>
  <div class="charts-container">
    <Plot
      type="line"
      label="temperature"
      data={$state.snapshot(weatherData.temperature)}
      labels={$state.snapshot(weatherData.time)}
      lollipop={false}
    />
    <Plot
      type="bar"
      label="temperature"
      data={$state.snapshot(weatherData.temperature_acf)}
      labels={Array(weatherData.temperature_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="line"
      label="apparent_temperature"
      data={$state.snapshot(weatherData.apparent_temperature)}
      labels={$state.snapshot(weatherData.time)}
      lollipop={false}
    />
    <Plot
      type="bar"
      label="apparent_temperature"
      data={$state.snapshot(weatherData.apparent_temperature_acf)}
      labels={Array(weatherData.apparent_temperature_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="line"
      label="rain_intensity"
      data={$state.snapshot(weatherData.rain_sum)}
      labels={$state.snapshot(weatherData.time)}
      lollipop={false}
    />
    <Plot
      type="bar"
      label="rain_intensity"
      data={$state.snapshot(weatherData.rain_sum_acf)}
      labels={Array(weatherData.rain_sum_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="line"
      label="humidity"
      data={$state.snapshot(weatherData.relative_humidity)}
      labels={$state.snapshot(weatherData.time)}
      lollipop={false}
    />
    <Plot
      type="bar"
      label="humidity"
      data={$state.snapshot(weatherData.relative_humidity_acf)}
      labels={Array(weatherData.relative_humidity_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="line"
      label="wind_gusts"
      data={$state.snapshot(weatherData.wind_gusts)}
      labels={$state.snapshot(weatherData.time)}
      lollipop={false}
    />
    <Plot
      type="bar"
      label="wind_gusts"
      data={$state.snapshot(weatherData.wind_gusts_acf)}
      labels={Array(weatherData.wind_gusts_acf.length)
        .fill(undefined)
        .map((_, i) => i)}
      lollipop={true}
    />
    <Plot
      type="line"
      label="wind_speed"
      data={$state.snapshot(weatherData.wind_speed)}
      labels={$state.snapshot(weatherData.time)}
      lollipop={false}
    />
    <Plot
      type="bar"
      label="wind_speed"
      data={$state.snapshot(weatherData.wind_speed_acf)}
      labels={Array(weatherData.wind_speed_acf.length)
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

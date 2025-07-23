import { CallAPIJSON, type JSONServerResponse } from "../../adapters/api";

type DashboardOption = "Historical" | "Statistic" | "Forecast"
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
}
interface TimesOpt {
    years: Array<number>;
    months: Array<number>;
}
interface WeatherStatistic {
    temperature_acf: Array<number>;
    apparent_temperature_acf: Array<number>;
    wind_speed_acf: Array<number>;
    wind_gusts_acf: Array<number>;
    rain_sum_acf: Array<number>;
    relative_humidity_acf: Array<number>;
}
interface WeatherForecast {
    temperature: Array<number>;
    apparent_temperature: Array<number>;
    wind_speed: Array<number>;
    wind_gusts: Array<number>;
    time: Array<Date>;
    rain_sum: Array<number>;
    relative_humidity: Array<number>;
}

export interface StatisticUIState{
    statisticData: WeatherStatistic | null
    isError: Error | null
    isLoading: boolean
    setStatistic: (newStat: WeatherStatistic) => void
    stopLoading: () => void
    setError: (err: Error) => void
    getStatistic: () => Promise<JSONServerResponse<WeatherStatistic>>
}

export interface HistoricalUIState{
    opt: DashboardOption
    weatherData: WeatherData | null
    opts: TimesOpt | null
    isError: Error | null
    isLoading: boolean
    year: number
    month: number
    getHistoricalData: () => Promise<{res: JSONServerResponse<WeatherData>, opt: JSONServerResponse<TimesOpt>}>
    setWeatherData: (newData: WeatherData) => void
    setOption: (newOption: TimesOpt) => void
    stopLoading: () => void
    setError: (err: Error) => void
}

export interface ForecastUIState{
    isError: Error | null
    isLoading: boolean
    forecastData: WeatherForecast | null
    setForecast : (newForecast: WeatherForecast) => void
    stopLoading: () => void
    setError: (err: Error) => void
    getForecast: () => Promise<JSONServerResponse<WeatherForecast>>
}

class weatherUiState{
    opt = $state<DashboardOption>("Historical")
    weatherData = $state<WeatherData | null>(null);
    opts = $state<TimesOpt | null>(null);
    isError = $state<Error | null>(null);
    isLoading = $state<boolean>(false);
    year = $state<number>(new Date().getFullYear());
    month = $state<number>(new Date().getMonth());
    statisticData = $state<WeatherStatistic | null>(null)
    forecastData = $state<WeatherForecast | null>(null)

    async getForecast(){
        this.isLoading = true
        this.isError = null
        const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data/forecasts`;
        const res = await CallAPIJSON<WeatherForecast>(url, "GET", null)
        return res
    }

    setForecast(newForecast: WeatherForecast){
        this.forecastData = newForecast
    }

    async getStatistic(){
        this.isLoading = true
        this.isError = null
        const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data/statistics`;
        const res = await CallAPIJSON<WeatherStatistic>(url, "GET", null)
        return res
    }

    setStatistic(newStat: WeatherStatistic){
        this.statisticData = newStat
    }

    async getHistoricalData(){
        this.isLoading = true
        this.isError = null
        const url = `${import.meta.env.VITE_BACKEND_URL}/weather-data?month=${this.month}&year=${this.year}`;
        const optUrl = `${import.meta.env.VITE_BACKEND_URL}/weather-data/times`;
        const [dataRes, optRes] = await Promise.all([CallAPIJSON<WeatherData>(url, "GET", null), CallAPIJSON<TimesOpt>(optUrl, "GET", null)])
        return {res: dataRes, opt: optRes}
    }
    setWeatherData(newData: WeatherData){
        this.weatherData = newData
    }
    setOption(newOption: TimesOpt){
        this.opts = newOption
    }
    stopLoading(){
        this.isLoading = false
    }
    setError(err : Error){
        this.isError = err
    }
}

export const uiState = new weatherUiState()


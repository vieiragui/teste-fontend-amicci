import Weather from "@/interface/weather"
import api from "./api"

export const cityService = {
    async getWeather(): Promise<Weather> {
        return await api.get("2024-01-29T00:00:00ZP1D:PT1H/t_2m:C/-23.204449392652844,-45.88522201339471/json").then(response => {
            return JSON.parse(JSON.stringify(response.data)) as Weather
        })
    }
}
import { Coordinates } from '@/interface/coordinates';
import api from './api';
import Weather from '@/interface/weather';

export const weatherService = {
    async getWeather(coordinates: Coordinates): Promise<number> {
        return await api.get(`weather?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`).then(response => {
            const weather = response.data[0] as Weather
            return weather.value
        })
    }
}
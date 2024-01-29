import { Coordinates } from '@/interface/coordinates';
import api from './api';

export const weatherService = {
    async getWeather(coordinates: Coordinates) {
        return await api.get(`geocode?address=${city}`).then(response => {
            return response.data
        })
    }
}
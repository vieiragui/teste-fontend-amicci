import { Coordinates } from "@/interface/coordinates"
import api from "./api"

export const cityService = {
    async getCoordinates(city: string): Promise<Coordinates> {
        return await api.get(`geocode?address=${city}`).then(response => {
            return response.data
        })
    }
}
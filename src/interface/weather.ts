export default interface Weather {
    status: string,
    data: WeatherForecast[]
}

interface WeatherForecast {
    coordinates: Coordinates[]
}

interface Coordinates {
    lat: string,
    long: string,
    dates: Dates[]
}

interface Dates {
    date: Date,
    value: number
}
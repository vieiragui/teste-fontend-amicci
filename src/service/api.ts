import axios from 'axios'

const apiURL = "http://localhost:3002/"

const api = axios.create({
    baseURL: apiURL
})

export default api
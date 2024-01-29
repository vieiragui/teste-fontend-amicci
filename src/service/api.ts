import axios from 'axios'

const apiURL = "https://api.meteomatics.com/"

const api = axios.create({
    baseURL: apiURL,
    headers: {
        'Authorization': 'Basic dGhlZGV2c192aWVpcmFfZ3VpbGhlcm1lOm45cUI4d1FYMjA='
    }
})

export default api
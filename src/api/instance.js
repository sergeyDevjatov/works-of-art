import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use((config) => {
    config.params = config.params ?? {};
    config.params.apikey = process.env.VUE_APP_API_KEY;

    return config;
});

export default instance;
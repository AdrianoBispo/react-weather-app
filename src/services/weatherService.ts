import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric', // Para obter temperatura em Celsius
    lang: 'pt_br',   // Para obter descrições em Português
  },
});

export const getCurrentWeather = (city: string) => {
  return apiClient.get('/weather', { params: { q: city } });
};

export const getForecast = (lat: number, lon: number) => {
  return apiClient.get('/forecast', { params: { lat, lon } });
};

// Função para buscar previsão de 5 dias/3 horas
export const getFiveDayForecast = (city: string) => {
    return apiClient.get('/forecast', {
        params: {
            q: city,
        },
    });
};
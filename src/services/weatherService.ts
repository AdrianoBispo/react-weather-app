import { WeatherData, ForecastData } from "@/types";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const fetchWithCache = async <T>(url: string, cacheKey: string): Promise<T> => {
  const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  const cachedItem = localStorage.getItem(cacheKey);
  const now = new Date().getTime();

  if (cachedItem) {
    const { data, timestamp } = JSON.parse(cachedItem);
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Falha na requisição à API de clima.");
  }
  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: now }));
  return data;
};

export const fetchWeatherByCity = (city: string): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
  return fetchWithCache(url, `weather_${city}`);
};

export const fetchForecastByCity = (city: string): Promise<ForecastData> => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
  return fetchWithCache(url, `forecast_${city}`);
};

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Não foi possível buscar o clima para a sua localização.");
  }
  return response.json();
};

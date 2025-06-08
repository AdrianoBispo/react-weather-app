/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGeolocation } from "@/hooks/useGeolocation";
import { WeatherData, ForecastData } from "@/types";
import * as weatherService from "@/services/weatherService";
import * as firestoreService from "@/services/firestoreService";
import { getGeminiSuggestion } from "@/services/geminiService";

import { Header } from "@/components/layout/Header";
import { Loader } from "@/components/layout/Loader";
import { CurrentWeatherCard } from "@/components/dashboard/CurrentWeatherCard";
import { ForecastDisplay } from "@/components/dashboard/ForecastDisplay";
import { GeminiSuggestions } from "@/components/dashboard/GeminiSuggestions";
import { UserDataSidebar } from "@/components/dashboard/UserDataSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, XCircle } from "lucide-react";

export function DashboardPage() {
  const { user } = useAuth();
  const { location, error: geoError } = useGeolocation();

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [geminiSuggestion, setGeminiSuggestion] = useState<{
    type: "clothing" | "activity";
    text: string;
  } | null>(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const handleFetchAndSetData = useCallback(
    async (city: string) => {
      setIsLoading(true);
      setError(null);
      setGeminiSuggestion(null);

      try {
        const [weather, forecast] = await Promise.all([
          weatherService.fetchWeatherByCity(city),
          weatherService.fetchForecastByCity(city),
        ]);
        setWeatherData(weather);
        setForecastData(forecast);

        if (user) {
          const newHistory = await firestoreService.updateSearchHistory(
            user.uid,
            city,
            searchHistory
          );
          setSearchHistory(newHistory);
        }
      } catch (err: any) {
        setError(
          err.message ||
            "Não foi possível buscar os dados. Verifique o nome da cidade."
        );
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [user, searchHistory]
  );

  useEffect(() => {
    if (!user) return;
    firestoreService.getUserData(user.uid).then((data) => {
      setFavorites(data.favorites || []);
      setSearchHistory(data.searchHistory || []);
    });
  }, [user]);

  useEffect(() => {
    if (location) {
      weatherService
        .fetchWeatherByCoords(location.latitude, location.longitude)
        .then((data) => handleFetchAndSetData(data.name))
        .catch(() => handleFetchAndSetData("São Paulo"));
    } else if (geoError) {
      handleFetchAndSetData("São Paulo");
    }
  }, [location, geoError, handleFetchAndSetData]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = e.currentTarget.city.value;
    if (city) handleFetchAndSetData(city);
    e.currentTarget.reset();
  };

  const handleCityClick = (city: string) => {
    handleFetchAndSetData(city);
  };

  const handleToggleFavorite = async (city: string) => {
    if (!user) return;
    const isFav = favorites.includes(city);
    await firestoreService.toggleFavoriteCity(user.uid, city, isFav);
    setFavorites((prev) =>
      isFav ? prev.filter((f) => f !== city) : [...prev, city]
    );
  };

  const handleGeminiRequest = async (type: "clothing" | "activity") => {
    if (!weatherData) return;
    setIsGeminiLoading(true);
    setGeminiSuggestion(null);
    const suggestionText = await getGeminiSuggestion(weatherData, type);
    setGeminiSuggestion({ type, text: suggestionText });
    setIsGeminiLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 font-sans">
      <Header />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                name="city"
                placeholder="Buscar por uma cidade..."
                className="bg-gray-100 dark:bg-gray-700 border-0"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </Card>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader isVisible={true} />
            </div>
          )}
          {error && !isLoading && (
            <Card className="p-6 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 flex items-center gap-4">
              <XCircle className="h-8 w-8" />
              <div>
                <h3 className="font-bold">Ocorreu um erro</h3>
                <p>{error}</p>
              </div>
            </Card>
          )}

          {!isLoading && !error && weatherData && (
            <>
              <CurrentWeatherCard
                weatherData={weatherData}
                isFavorite={favorites.includes(weatherData.name)}
                onToggleFavorite={handleToggleFavorite}
                onGeminiRequest={handleGeminiRequest}
                isGeminiLoading={isGeminiLoading}
              />
              <GeminiSuggestions
                suggestion={geminiSuggestion}
                isLoading={isGeminiLoading}
              />
              {forecastData && <ForecastDisplay forecastData={forecastData} />}
            </>
          )}
        </div>
        <div className="space-y-6">
          <UserDataSidebar
            favorites={favorites}
            history={searchHistory}
            onCityClick={handleCityClick}
          />
        </div>
      </main>
    </div>
  );
}

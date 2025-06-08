import { WeatherData } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Heart,
  Droplets,
  Wind,
  Sparkles,
  BrainCircuit,
} from "lucide-react";
import { useMemo } from "react";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
  weatherData: WeatherData;
  isFavorite: boolean;
  onToggleFavorite: (city: string) => void;
  onGeminiRequest: (type: "clothing" | "activity") => void;
  isGeminiLoading: boolean;
}

const WeatherIcon = ({
  condition,
  className,
}: {
  condition: string;
  className?: string;
}) => {
  const Icon = useMemo(() => {
    switch (condition.toLowerCase()) {
      case "clouds":
        return Cloud;
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return CloudRain;
      case "snow":
        return CloudSnow;
      case "clear":
        return Sun;
      default:
        return Sun;
    }
  }, [condition]);
  return <Icon className={cn("h-16 w-16", className)} />;
};

export function CurrentWeatherCard ({
  weatherData,
  isFavorite,
  onToggleFavorite,
  onGeminiRequest,
  isGeminiLoading,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Card className="p-6 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <h2 className="text-3xl font-bold">{weatherData.name}</h2>
            </div>
            <p className="capitalize text-gray-500 dark:text-gray-400">
              {weatherData.weather[0].description}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => onToggleFavorite(weatherData.name)}
          >
            <Heart
              className={cn(
                "h-6 w-6",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              )}
            />
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-around mt-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <WeatherIcon
              condition={weatherData.weather[0].main}
              className="text-yellow-400"
            />
            <p className="text-6xl font-bold">
              {Math.round(weatherData.main.temp)}°C
            </p>
          </div>
          <div className="space-y-2 mt-4 sm:mt-0">
            <div className="flex items-center gap-2 text-lg">
              <Droplets className="h-5 w-5 text-blue-400" />
              <span>Umidade: {weatherData.main.humidity}%</span>
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Wind className="h-5 w-5 text-gray-400" />
              <span>Vento: {weatherData.wind.speed.toFixed(1)} km/h</span>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => onGeminiRequest("clothing")}
            disabled={isGeminiLoading}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" /> O que Vestir?
          </Button>
          <Button
            onClick={() => onGeminiRequest("activity")}
            disabled={isGeminiLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white"
          >
            <BrainCircuit className="mr-2 h-4 w-4" /> Sugerir Atividades
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

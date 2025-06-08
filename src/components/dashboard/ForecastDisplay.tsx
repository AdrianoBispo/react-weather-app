import { useState, useMemo } from "react";
import { ForecastData, ForecastItem } from "@/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  forecastData: ForecastData;
}

export function ForecastDisplay({ forecastData }: Props) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const dailyForecasts = useMemo(() => {
    const daily = forecastData.list.reduce((acc, item) => {
      const day = item.dt_txt.split(" ")[0];
      if (!acc[day]) {
        acc[day] = item;
      }
      return acc;
    }, {} as Record<string, ForecastItem>);
    return Object.values(daily).slice(0, 5);
  }, [forecastData]);

  const hourlyForecast = useMemo(() => {
    if (!selectedDay) return [];
    return forecastData.list.filter((item) =>
      item.dt_txt.startsWith(selectedDay)
    );
  }, [selectedDay, forecastData]);

  return (
    <>
      <Card className="p-6 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold mb-4">Previsão para 5 dias</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {dailyForecasts.map((day) => (
            <button
              key={day.dt_txt}
              onClick={() => setSelectedDay(day.dt_txt.split(" ")[0])}
              className={cn(
                "p-3 rounded-lg text-center transition-all",
                selectedDay === day.dt_txt.split(" ")[0]
                  ? "bg-blue-100 dark:bg-blue-900/50"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <p className="font-semibold">
                {new Date(day.dt_txt).toLocaleDateString("pt-BR", {
                  weekday: "short",
                })}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="mx-auto h-12 w-12"
              />
              <p className="font-bold">{Math.round(day.main.temp)}°C</p>
            </button>
          ))}
        </div>
      </Card>
      <AnimatePresence>
        {hourlyForecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="mt-6 p-6 bg-white dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-4">Previsão por hora</h3>
              <div className="flex overflow-x-auto space-x-4 pb-2">
                {hourlyForecast.map((hour) => (
                  <div
                    key={hour.dt_txt}
                    className="flex-shrink-0 p-3 rounded-lg text-center bg-gray-100 dark:bg-gray-700"
                  >
                    <p className="font-semibold">
                      {new Date(hour.dt_txt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                      alt={hour.weather[0].description}
                      className="mx-auto h-10 w-10"
                    />
                    <p className="font-bold">{Math.round(hour.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

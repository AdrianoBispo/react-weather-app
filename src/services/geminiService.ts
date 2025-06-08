import { WeatherData } from "@/types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiSuggestion = async (
  weatherData: WeatherData,
  type: "clothing" | "activity"
): Promise<string> => {
  let prompt = "";
  if (type === "clothing") {
    prompt = `Baseado no seguinte clima em ${weatherData.name}: ${
      weatherData.main.temp
    }°C, ${weatherData.weather[0].description}, umidade de ${
      weatherData.main.humidity
    }% e ventos de ${weatherData.wind.speed.toFixed(
      1
    )} km/h, sugira em português o que uma pessoa deveria vestir. Seja breve, amigável e direto, em uma ou duas frases.`;
  } else {
    prompt = `Baseado no seguinte clima em ${weatherData.name}: ${weatherData.main.temp}°C e ${weatherData.weather[0].description}, sugira 3 atividades (internas ou externas, apropriadas para o clima) que uma pessoa poderia fazer hoje. Formate como uma lista com marcadores (usando -). Responda em português.`;
  }

  try {
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Falha ao se comunicar com a IA.");
    }

    const result = await response.json();
    if (result.candidates && result.candidates.length > 0) {
      return result.candidates[0].content.parts[0].text;
    }
    throw new Error("Resposta da IA inválida.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, não consegui pensar em nada agora. Tente novamente.";
  }
};

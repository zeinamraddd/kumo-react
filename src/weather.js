
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.weatherapi.com/v1/forecast.json";

async function getJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("rate-limit");
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error("api-key");
      }

      throw new Error(`http-${response.status}`);
    }

    return await response.json();
  } catch (err) {
    if (
      err.message === "rate-limit" ||
      err.message === "api-key" ||
      err.message.startsWith("http-")
    ) {
      throw err;
    }

    throw new Error("network", { cause: err });
  }
}

async function geocodeCity(city) {
  const params = new URLSearchParams({
    name: city,
    count: 1,
    language: "en",
    format: "json"
  });

  const data = await getJSON(`${GEO_URL}?${params}`);

  if (!data.results?.length) {
    throw new Error("not-found");
  }

  return data.results[0];
}

export async function loadWeather(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey || apiKey === "PASTE_YOUR_WEATHERAPI_KEY_HERE") {
    throw new Error("api-key");
  }

  const place = await geocodeCity(city);

  const params = new URLSearchParams({
    key: apiKey,
    q: `${place.latitude},${place.longitude}`,
    days: "3",
    aqi: "no"
  });

  const data = await getJSON(`${WEATHER_URL}?${params}`);

  return {
    searchedName: place.name,
    country: place.country,
    current: data.current,
    forecast: data.forecast.forecastday
  };
}


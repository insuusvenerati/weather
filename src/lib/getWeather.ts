import { Lookup } from "geoip-lite";
import { Current } from "../types/current";

export const getWeather = async (location: Lookup): Promise<Current> => {
  if (!location.ll) {
    throw new Error(`Missing location information`);
  }
  const coords = {
    lat: location?.ll[0],
    lon: location?.ll[1],
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&exclude=alerts,hourly,minutely&units=imperial`
  );
  if (!response.ok) {
    throw new Error(`Error fetching current weather`);
  }

  return response.json();
};

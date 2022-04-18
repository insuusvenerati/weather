import dayjs from "dayjs";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import type { Current, Daily } from "../types/current";

type WeatherCardProps = {
  weather: Current | Daily[];
  isLoading: boolean;
  error: unknown;
};

const isCurrent = (weather: Current | Daily[]): weather is Current => {
  return (weather as Current)?.current !== undefined;
};

export const WeatherCard = ({ weather, isLoading, error }: WeatherCardProps) => {
  if (isLoading) {
    return (
      <div className={styles.card}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <h2>Error</h2>
        <p>{error.toString()}</p>
      </div>
    );
  }

  if (isCurrent(weather)) {
    const day = dayjs.unix(weather?.current?.dt).format("ddd");
    const currentWeatherIcon = `http://openweathermap.org/img/wn/${weather?.current?.weather[0]?.icon}@2x.png`;
    return (
      <div className={styles.card}>
        <h2>{day}</h2>
        <Image alt={weather.current.weather[0].description} src={currentWeatherIcon} width={100} height={100} />
        <p style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>{weather.current.temp.toPrecision(2)}F</strong>
          <strong>{weather.current.feels_like.toPrecision(2)}F</strong>
        </p>
      </div>
    );
  }

  return (
    <>
      {weather?.map((day) => {
        const dayOfWeek = dayjs.unix(day?.dt).format("ddd");
        const currentWeatherIcon = `http://openweathermap.org/img/wn/${day?.weather[0]?.icon}@2x.png`;
        return (
          <div key={day.dt} className={styles.card}>
            <h2>{dayOfWeek}</h2>
            <Image alt={day.weather[0].description} src={currentWeatherIcon} width={100} height={100} />
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{day.temp.min.toPrecision(2)}F</strong>
              <strong>{day.temp.max.toPrecision(2)}F</strong>
            </p>
          </div>
        );
      })}
    </>
  );
};

import { Lookup } from "geoip-lite";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useQuery } from "react-query";
import { WeatherCard } from "../components/WeatherCard";
import { getWeather } from "../lib/getWeather";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data: location } = useQuery(
    "location",
    async (): Promise<Lookup> => {
      const loc = await fetch(`/api/location`);
      if (!loc.ok) {
        throw new Error(`Something went wrong getting location`);
      }
      return loc.json();
    },
    { refetchOnWindowFocus: false }
  );
  const {
    data: currentWeather,
    isLoading,
    error,
  } = useQuery("currentWeather", () => getWeather(location), {
    enabled: !!location?.ll,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>The Weather</title>
        <meta name="description" content="Easy way for me to get the weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isLoading ? (
          <h1 className={styles.title}>Location: Loading...</h1>
        ) : (
          <h1 className={styles.title}>Location: {location?.city}</h1>
        )}

        <div className={styles.grid}>
          <WeatherCard isLoading={isLoading} error={error} weather={currentWeather?.daily} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

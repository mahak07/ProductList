import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styleWeather';
import { fetchWeather } from '../services/fetchWeather';
import { getWeatherFromCache, saveWeatherToCache } from '../utils/weatherCache';
import { getUserLocation } from '../utils/location';
import WeatherSkeleton from '../component/weatherSkeleton';
import { WeatherData } from '../interfaces/weather';

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    try {
      setLoading(true);
      const cached = await getWeatherFromCache();
      if (cached) {
        setWeather(cached);
        setLoading(false);
        return;
      }

      const { latitude, longitude } = await getUserLocation();
      const data = await fetchWeather(latitude, longitude);
      setWeather(data);
      await saveWeatherToCache(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  if (loading) return <WeatherSkeleton />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {weather && weather.main && weather.weather?.[0] ? (
        <>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.condition}>{weather.weather[0].description}</Text>
          <Text style={styles.humidity}>Humidity: {weather.main.humidity}%</Text>
        </>
      ) : (
        <Text style={styles.error}>Weather data not available.</Text>
      )}
    </View>
  );
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '../interfaces/weather'; // adjust path as needed

const CACHE_KEY = 'WEATHER_CACHE';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Simple validation to check if data looks like valid WeatherData
const isValidWeatherData = (data: any): data is WeatherData => {
  return (
    data &&
    typeof data === 'object' &&
    data.main !== undefined &&
    data.weather !== undefined &&
    Array.isArray(data.weather) &&
    data.weather.length > 0
  );
};

export const saveWeatherToCache = async (data: any) => {
  if (!isValidWeatherData(data)) {
    console.warn('Attempted to cache invalid weather data. Skipping cache.');
    return; // Don't cache invalid data
  }

  const cache = {
    timestamp: Date.now(),
    data,
  };

  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving weather cache:', error);
  }
};

export const getWeatherFromCache = async (): Promise<WeatherData | null> => {
  try {
    const cache = await AsyncStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const { timestamp, data } = JSON.parse(cache);

    // Expired cache
    if (Date.now() - timestamp > CACHE_DURATION) {
      await AsyncStorage.removeItem(CACHE_KEY);
      return null;
    }

    // Validate cache data before returning
    if (!isValidWeatherData(data)) {
      await AsyncStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading weather cache:', error);
    return null;
  }
};
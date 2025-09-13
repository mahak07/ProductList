import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../interfaces/news';

const CACHE_KEY = '@news_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheData {
  timestamp: number;
  data: Article[];
}

const isValidCache = (obj: any): obj is CacheData => {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.timestamp === 'number' &&
    Array.isArray(obj.data)
  );
};

export const saveNewsToCache = async (data: Article[]) => {
  try {
    const cache: CacheData = { timestamp: Date.now(), data };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Error saving news cache:', e);
  }
};

export const getNewsFromCache = async (): Promise<Article[] | null> => {
  try {
    const cacheStr = await AsyncStorage.getItem(CACHE_KEY);
    if (!cacheStr) return null;

    const cache = JSON.parse(cacheStr);

    if (!isValidCache(cache)) {
      await AsyncStorage.removeItem(CACHE_KEY);
      return null;
    }

    if (Date.now() - cache.timestamp > CACHE_DURATION) {
      await AsyncStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cache.data;
  } catch (e) {
    console.warn('Error reading news cache:', e);
    return null;
  }
};
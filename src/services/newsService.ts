import { NewsApiResponse } from "../interfaces/news";


const NEWS_API_KEY = 'f6700020a5404c8faeb6b0426a9f6a32';
const PAGE_SIZE = 20;

export const fetchNews = async (page: number): Promise<NewsApiResponse> => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${NEWS_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Network error: ${res.status}`);
  }

  const data: NewsApiResponse = await res.json();

  if (data.status !== 'ok') {
    throw new Error(data.message || 'API error');
  }

  return data;
};
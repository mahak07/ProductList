import { useState, useEffect } from 'react';
import Category from '../interfaces/category';

type FetchResult<T> = {
  data: T;
  error: string | null;
};

const useCategories = (): FetchResult<Category[]> => {
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: Category[] = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong');
      }
    };

    fetchData();
  }, []);
  return { data, error };
};

export default useCategories;
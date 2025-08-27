import { useState, useEffect, useCallback } from 'react';
import ProductResponse from '../interfaces/product';
import { Product } from '../interfaces/product';

const LIMIT = 10;


const useProducts = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    setSkip(0);
  }, [category]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const categoryPath = category !== 'all' ? `/category/${category}` : '';
        const response = await fetch(
          `https://dummyjson.com/products${categoryPath}?limit=${LIMIT}&skip=${skip}`,
          { signal: controller.signal }
        );
        const data: ProductResponse = await response.json();

        setProducts(prev => (skip === 0 ? data.products : [...prev, ...data.products]));
        setHasMore(skip + data.products.length < data.total);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [skip, category]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setSkip(prev => prev + LIMIT);
    }
  }, [loading, hasMore]);

  return { data: { products }, loading, error, hasMore, loadMore };
};

export default useProducts;
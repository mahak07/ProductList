import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Article } from '../interfaces/news';
import { getNewsFromCache, saveNewsToCache } from '../utils/newsCache';
import { fetchNews } from '../services/newsService';
import styles from '../styles/styleNews';

export default function NewsReader() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const isMountedRef = useRef(true);

  const loadArticles = useCallback(
    async (pageToLoad: number, isRefresh = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchNews(pageToLoad);

        if (data.articles.length === 0 || data.articles.length < 20) {
          setHasMore(false);
        }

        if (isRefresh || pageToLoad === 1) {
          setArticles(data.articles);
          await saveNewsToCache(data.articles);
        } else {
          setArticles(prev => [...prev, ...data.articles]);
        }

        setPage(pageToLoad);
      } catch (e: any) {
        setError(e.message || 'Failed to load news');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading]
  );

  const onRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    loadArticles(1, true);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadArticles(page + 1);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const loadInitial = async () => {
        const cache = await getNewsFromCache();
        if (cache && cache.length > 0) {
          setArticles(cache);
        }
        setPage(1);
        setHasMore(true);
        loadArticles(1, true);
      };

      isMountedRef.current = true;
      loadInitial();

      return () => {
        isMountedRef.current = false;
      };
    }, [loadArticles])
  );

  const renderArticle = ({ item }: { item: Article }) => (
    <TouchableOpacity style={styles.articleContainer} onPress={() => {}}>
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.source}>{item.source.name}</Text>
        <Text style={styles.date}>
          {new Date(item.publishedAt).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && articles.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && articles.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <Text onPress={() => loadArticles(1, true)} style={styles.retry}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => item.url + index}
      renderItem={renderArticle}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={
        loading && hasMore ? <ActivityIndicator style={{ margin: 10 }} /> : null
      }
      contentContainerStyle={{ padding: 10 }}
      ListEmptyComponent={
        !loading ? (
          <View style={styles.center}>
            <Text>No articles found.</Text>
          </View>
        ) : null
      }
    />
  );
}
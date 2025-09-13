import useProducts from "../hooks/useProducts";
import { FlatList, View, Text, ActivityIndicator, TextInput, Button } from 'react-native';
import ProductCard from "../component/productCard";
import styles from "../styles/styleList";
import { useState, useMemo, useRef, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { capitalize } from "../utils/utility";
import useCategories from "../hooks/useCategories";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type ProductListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export default function ProductList() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data, loading, error, hasMore, loadMore } = useProducts(selectedCategory) ;
  const { data: categoriesData, error: catError } = useCategories();
  const ITEM_HEIGHT = 100;
  const navigation = useNavigation<ProductListNavigationProp>();

  const handleLoadMore = () => {
    loadMore();
  };  
  
  const renderFooter = () =>
    loading ? <ActivityIndicator size="small" color="#0000ff" /> : null;

   const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return searchText
      ? data.products.filter(product =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : data.products;
  }, [data?.products, searchText]);

  if (error || catError) {
    return (
      <View style={styles.center}>
        <Text>Error: {error || catError}</Text>
      </View>
    );
  }
``
  return (

    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title="Weather" onPress={() => navigation.navigate('Weather')} />
        <Button title="News Reader" onPress={() => navigation.navigate('NewsReader')} />
        <Button title="Expense Tracker" onPress={() => navigation.navigate('ExpenseTracker')} />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            setSearchText('');
          }}
        >
          <Picker.Item label="All Categories" value="all" />
          {categoriesData?.map(category => (
            <Picker.Item
              key={category.name}
              label={capitalize(category.name)}
              value={category.slug}
            />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={<Text>No products found</Text>}
        onEndReached={() => {
          handleLoadMore();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}    
        initialNumToRender={10}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index
        })}
      />
    </View>
  );
};
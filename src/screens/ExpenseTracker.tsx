import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { fetchExpenses } from '../database/db';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import styles from '../styles/styleTracker';
import { Expense } from '../interfaces/expense';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
type ExpenseTrackerNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpenseTracker'>;

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const isFocused = useIsFocused(); // Refresh on screen focus
  const navigation = useNavigation<ExpenseTrackerNavigationProp>();

  useEffect(() => {
    loadExpenses();
  }, [isFocused]);

  const loadExpenses = async () => {
    const data = await fetchExpenses();
    setExpenses(data);
    const totalAmount = data.reduce((sum, exp) => sum + exp.amount, 0);
    setTotal(totalAmount);
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.note}>{item.note || '—'}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total: ₹{total.toFixed(2)}</Text>

      <FlatList
        data={expenses.reverse()}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={renderItem}
      />

      <View style={styles.buttons}>
        <Button title="Add Expense" onPress={() => navigation.navigate('ExpenseForm')} />
        <Button title="Charts" onPress={() => navigation.navigate('ChartScreen')} />
      </View>
    </View>
  );
};
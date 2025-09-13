import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { insertExpense } from '../database/db';

const ExpenseForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    const expense = {
      category,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      note,
    };
    insertExpense(expense);
    setCategory('');
    setAmount('');
    setNote('');
  };

  return (
    <View>
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
      <TextInput placeholder="Note" value={note} onChangeText={setNote} />
      <Button title="Add Expense" onPress={handleSubmit} />
    </View>
  );
};

export default ExpenseForm;
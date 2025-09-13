import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login.tsx';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext.tsx';
import { ActivityIndicator, View } from 'react-native';
import ProductList from '../screens/ProductList.tsx';
import { Button } from 'react-native';
import Weather from '../screens/Weather.tsx';
import NewsReader from '../screens/NewsReader.tsx';
import { RootStackParamList } from './types.ts';
import ExpenseTracker from '../screens/ExpenseTracker.tsx';
import ChartScreen from '../screens/ChartScreen.tsx';
import ExpenseForm from '../component/expenseForm.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { token, isLoading, logout } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {token ? (<>
                    <Stack.Screen name="ProductList" component={ProductList} options={{
                        headerRight: () => (
                            <Button title="Logout" onPress={() => {
                                // Call your logout function from AuthContext
                                if (typeof logout === 'function') logout();
                            }} />
                        ),
                    }} />
                    <Stack.Screen
                        name="Weather"
                        component={Weather}
                        options={{ title: 'Weather Forecast' }}
                    />
                    <Stack.Screen
                        name="NewsReader"
                        component={NewsReader}
                        options={{ title: 'News Reader' }}
                    />
                    <Stack.Screen 
                        name="ExpenseTracker" 
                        component={ExpenseTracker} 
                        options={{ title: 'Expense Tracker' }}
                    />
                    <Stack.Screen name="ExpenseForm" component={ExpenseForm} options={{ title: 'Add Expense' }} />
                    <Stack.Screen name="ChartScreen" component={ChartScreen} options={{ title: 'Charts' }} />
                </>) : (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
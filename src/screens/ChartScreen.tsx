import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { fetchExpensesByCategory } from '../database/db';

const screenWidth = Dimensions.get('window').width;

const ChartScreen = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchExpensesByCategory();
                console.log("Fetched raw data:", res);

                const chartData = res
                    .filter(item => item.category && item.total && !isNaN(item.total))
                    .map((item) => ({
                        name: item.category,
                        population: item.total,
                        color: getRandomColor(),
                        legendFontColor: '#333',
                        legendFontSize: 15,
                    }));

                console.log("Mapped chart data:", chartData);
                setData(chartData);
            } catch (error) {
                console.error("Chart error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <View style={{ padding: 20 }}>
                <Text>Loading chart...</Text>
            </View>
        );
    }

    if (!data.length) {
        return (
            <View style={{ padding: 20 }}>
                <Text>No expense data to display chart.</Text>
            </View>
        );
    }

    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: () => '#000', // Must define this
                    labelColor: () => '#000', // Optional but recommended
                }}
            />
        </View>
    );
};

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
};

export default ChartScreen;
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const DetailedStatisticsPage = ({ navigation, route }) => {
    const data = route.params.data;

    return (
        <SafeAreaView>
            <View>
                <Text>{data.correctAns}</Text>
            </View>
        </SafeAreaView>

    );
};

export default DetailedStatisticsPage;

import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Colors from '../theme/Colors';

const DetailedStatisticsPage = ({ navigation, route }) => {
    const data = route.params.data;

    return (
        <SafeAreaView style={styles.center}>
            <View style={styles.center}>
                <Text style={styles.bigGreenText}>Correct answers</Text>
                <Text style={styles.mediumText}>{data.correctAns}</Text>
                <Text style={styles.mediumText}>{data.startDate}</Text>
                <Text style={styles.mediumText}>{data.duration}</Text>
            </View>
        </SafeAreaView >

    );
};

export default DetailedStatisticsPage;

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigGreenText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: Colors.green,
    },
    mediumText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

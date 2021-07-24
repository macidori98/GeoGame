import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../theme/Colors';

const DetailedStatisticsPage = ({ navigation, route }) => {
    const data = route.params.data;
    const nextRoute = route.params.nextRoute;

    return (
        <SafeAreaView style={styles.center}>
            <View style={styles.center}>
                <Text style={styles.bigGreenText}>Correct answers</Text>
                <Text style={styles.mediumText}>{data.correctAns}</Text>
                <Text style={styles.normalText}>Date and time</Text>
                <Text style={styles.mediumText}>{data.startDate}</Text>
                <Text style={styles.normalText}>Duration</Text>
                <Text style={styles.mediumText}>{data.duration}</Text>
                <TouchableOpacity
                    onPress={() => { navigation.navigate(nextRoute); }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Play again</Text>
                </TouchableOpacity>
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
    normalText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
    },
    mediumText: {
        fontWeight: '400',
        fontSize: 20,
    },
    button: {
        backgroundColor: Colors.cyclamen,
        padding: 15,
        borderRadius: 5,
        marginTop: 60,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 15,
    },
});

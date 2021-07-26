import { View, SafeAreaView, RefreshControl, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { readData } from '../services/SaveData';
import { ScrollView } from 'react-native-gesture-handler';
import ResultsCard from '../components/ResultsCard';
import Error from '../components/Error';
import Colors from '../theme/Colors';

const StatisticsScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [gameData, setGameData] = React.useState([]);
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const nextRoute = route.params.nextRoute;

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        readLocalData();
    }, []);

    const readLocalData = () => {
        readData()
            .then((result) => {
                setGameData(result.reverse());
                setRefreshing(false);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };

    const onItemClick = (item) => {
        navigation.navigate(nextRoute, {
            data: item,
        });
    };

    React.useEffect(() => {
        readLocalData();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {loading && !error && (<ActivityIndicator style={styles.center} size="large" color={Colors.primary} />)}
                {gameData.length === 0 && !error && !loading && (
                    <Text>No played games data</Text>
                )}
                {gameData.length > 0 && !error && !loading && (
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing}
                            onRefresh={onRefresh} />}>
                        <FlatList data={gameData}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <ResultsCard onItemClick={onItemClick} item={item} />} />
                    </ScrollView>)}
                {error && !loading && <Error />}
            </View>
        </SafeAreaView>
    );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
});

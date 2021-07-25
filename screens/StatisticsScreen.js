import { View, SafeAreaView, RefreshControl, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { readData } from '../services/SaveData';
import { ScrollView } from 'react-native-gesture-handler';
import ResultsCard from '../components/ResultsCard';

const StatisticsScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [gameData, setGameData] = React.useState([]);
    const [error, setError] = React.useState();
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
            })
            .catch(err => {
                setError(err);
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
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh} />}>
                    <FlatList data={gameData}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) =>
                            <ResultsCard onItemClick={onItemClick} item={item} />} />
                </ScrollView>
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

import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { Regions } from '../utils/Constants';
import SimpleList from '../components/SimpleList';

const RegionScreen = ({ navigation, route }) => {
    const nextRoute = route.params.nextRoute;
    const game = route.params.game;
    const data = route.params.data;

    const onItemSelected = game ? (item) => {
        data.region = item;

        navigation.navigate(nextRoute, {
            data: data,
            game: game,
        });
    } : (item) => {
        navigation.navigate(nextRoute, {
            region: item,
        });
    };

    return (
        <SafeAreaView>
            <View>
                <SimpleList navigation={navigation} dataList={Regions} onItemSelected={onItemSelected} />
            </View>
        </SafeAreaView>
    );
};

export default RegionScreen;

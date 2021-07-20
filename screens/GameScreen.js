import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { GameTypes } from '../utils/Constants';
import SimpleList from '../components/SimpleList';

const GameScreen = ({ navigation, route }) => {
    const nextRoute = route.params.nextRoute;
    const data = route.params.data;
    const game = route.params.game;

    const onItemSelected = (item) => {
        data.type = item;

        navigation.navigate(nextRoute, {
            data: data,
            game: game,
        });
    };

    return (
        <SafeAreaView>
            <View>
                <SimpleList dataList={GameTypes} navigation={navigation} onItemSelected={onItemSelected} />
            </View>
        </SafeAreaView>
    );
};

export default GameScreen;

import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { QuestionNumberOptions } from '../utils/Constants';
import SimpleList from '../components/SimpleList';

const QuestionNumberScreen = ({ navigation, route }) => {
    const nextRoute = route.params.nextRoute;
    const game = route.params.game;
    const data = route.params.data;

    const onItemSelected = (item) => {
        data.questionNo = item;

        navigation.navigate(nextRoute, {
            data: data,
            game: game,
        });
    };

    return (
        <SafeAreaView>
            <View>
                <SimpleList navigation={navigation} dataList={QuestionNumberOptions} onItemSelected={onItemSelected} />
            </View>
        </SafeAreaView>
    );
};

export default QuestionNumberScreen;

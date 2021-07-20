import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegionDetailScreen from '../screens/RegionDetailScreen';
import RegionScreen from '../screens/RegionScreen';
import CountryDetailScreen from '../screens/CountryDetailsScreen';
import GameScreen from '../screens/GameScreen';
import { InitialGameObj } from '../utils/Constants';
import QuestionNumberScreen from '../screens/QuestionNumberScreen';

const Stack = createStackNavigator();

export const StudyNavigation = () => {

    return (
        <Stack.Navigator headerMode={'screen'}>
            <Stack.Screen name="SelectRegionStudy" component={RegionScreen} initialParams={{ nextRoute: 'RegionDetail' }} />
            <Stack.Screen name="RegionDetail" component={RegionDetailScreen} initialParams={{ nextRoute: 'CountryDetail' }} />
            <Stack.Screen name="CountryDetail" component={CountryDetailScreen} initialParams={{ nextRoute: 'CountryDetail' }} />
        </Stack.Navigator>
    );
};

export const GamgeNavigation = () => {
    return (
        <Stack.Navigator headerMode={'screen'}>
            <Stack.Screen name="GameScreen" component={GameScreen} initialParams={{ nextRoute: 'SelectRegionGame', game: true, data: InitialGameObj }} />
            <Stack.Screen name="SelectRegionGame" component={RegionScreen} initialParams={{ nextRoute: 'SelectQuestionNumber', game: true, data: InitialGameObj }} />
            <Stack.Screen name="SelectQuestionNumber" component={QuestionNumberScreen} initialParams={{ nextRoute: 'Game' }} />
        </Stack.Navigator>
    );
};

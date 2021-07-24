import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegionDetailScreen from '../screens/RegionDetailScreen';
import RegionScreen from '../screens/RegionScreen';
import CountryDetailScreen from '../screens/CountryDetailsScreen';
import GameScreen from '../screens/GameScreen';
import { InitialDetailedStatObj, InitialGameObj } from '../utils/Constants';
import QuestionNumberScreen from '../screens/QuestionNumberScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import DetailedStatisticsPage from '../screens/DetailedStatisticsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

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
            <Stack.Screen name="SelectQuestionNumber" component={QuestionNumberScreen} initialParams={{ nextRoute: 'Questions', game: true, data: InitialGameObj }} />
            <Stack.Screen name="Questions" component={QuestionsScreen} initialParams={{ nextRoute: 'DetailedStatisticsGame', game: true, data: InitialGameObj }} />
            <Stack.Screen name="DetailedStatisticsGame" component={DetailedStatisticsPage} initialParams={{ nextRoute: 'GameScreen', game: true, data: InitialDetailedStatObj }} />
        </Stack.Navigator>
    );
};

export const StatisticsNavigation = () => {
    return (
        <Stack.Navigator headerMode={'screen'}>
            <Stack.Screen name="StatisticsScreen" component={StatisticsScreen} initialParams={{ nextRoute: 'DetailedStatistics' }} />
            <Stack.Screen name="DetailedStatistics" component={DetailedStatisticsPage} initialParams={{ nextRoute: '', game: false, data: InitialDetailedStatObj }} />
        </Stack.Navigator>
    );
};

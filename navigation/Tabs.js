import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/Colors';
import { Screens } from '../utils/Constants';
import { GamgeNavigation, StatisticsNavigation, StudyNavigation } from './Navigation';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: styles.bottomNav,
            }}>
            <Tab.Screen
                name={Screens.study}
                component={StudyNavigation}
                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.center}>
                                <Icon name={'book'} size={25} color={focused ? Colors.primary : Colors.lightGray} />
                                <Text style={focused ? styles.textFocused : styles.textUnfocused}>{Screens.study}</Text>
                            </View>
                        ),
                    }
                } />
            <Tab.Screen
                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.center}>
                                <Icon name={'game-controller'} size={25} color={focused ? Colors.primary : Colors.lightGray} />
                                <Text style={focused ? styles.textFocused : styles.textUnfocused}>{Screens.game}</Text>
                            </View>
                        ),
                    }
                }
                name={Screens.game}
                component={GamgeNavigation} />
            <Tab.Screen
                options={
                    {
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.center}>
                                <Icon name={'stats-chart'} size={25} color={focused ? Colors.primary : Colors.lightGray} />
                                <Text style={focused ? styles.textFocused : styles.textUnfocused}>{Screens.statistics}</Text>
                            </View>
                        ),
                    }
                }
                name={Screens.statistics}
                component={StatisticsNavigation} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        top: Platform.OS === 'ios' ? 15 : 0,
    },
    textFocused: {
        color: Colors.primary,
    },
    textUnfocused: {
        color: Colors.lightGray,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 20,
        left: 15,
        right: 15,
        elevation: 0,
        backgroundColor: Colors.white,
        height: 70,
        borderRadius: 40,
        shadowColor: Colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    shadow: {
        shadowColor: Colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default Tabs;

import AsyncStorage from '@react-native-community/async-storage';
import { DATABASE_KEY } from '../utils/Constants';

export const saveData = async (newGame) => {
    var gamesList = await readData();
    gamesList != null ? gamesList.push(newGame) : gamesList = [];

    try {
        const jsonValue = JSON.stringify(gamesList);
        await AsyncStorage.setItem(DATABASE_KEY, jsonValue);
        return { 'success': true };
    } catch (error) {
        return { 'success': false };
    }
};

export const readData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(DATABASE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        return 'error';
    }
};

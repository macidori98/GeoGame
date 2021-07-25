import moment from 'moment';
import { saveData } from '../services/SaveData';

export const shuffle = (arr) => {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
};

export const getDurationString = (durationInMillis) => {
    var sec = Math.floor(durationInMillis / 1000);
    var minutes = Math.floor(sec / 60);
    sec = sec % 60;
    minutes = minutes % 60;
    var stringSec = sec.toString().length === 2 ? `${sec}` : `0${sec}`;
    var minutesString = minutes.toString().length === 2 ? `${minutes}` : `0${minutes}`;

    return `${minutesString}:${stringSec}`;
};

export const endGame = (startDateAndTime, correctAnswer, navigation, nextRoute) => {
    var endDate = Date.now();
    var durationInMillis = endDate - startDateAndTime;

    var duration = getDurationString(durationInMillis);

    const resultData = {
        correctAns: correctAnswer,
        startDate: moment(startDateAndTime).format('DD MMM yyyy, HH:mm'),
        duration: duration,
    };

    saveData(resultData);

    navigation.navigate(nextRoute, {
        data: resultData,
    });
};

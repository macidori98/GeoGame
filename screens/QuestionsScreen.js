import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import Error from '../components/Error';
import { generateGuessCapitalQuestions, generateGuessFlagQuestions, generateGuessTheNeighbourQuestions } from '../utils/RandomQuestionSelector';
import Colors from '../theme/Colors';
import { endGame } from '../utils/Helpers';
import { GameModes } from '../utils/Constants';
import GuessTheCapital from '../components/GuessTheCapital';
import GuessTheFlag from '../components/GuessTheFlag';
import GuessTheNeighbor from '../components/GuessTheNeighbor';

var correctAnswer;

const QuestionsScreen = ({ navigation, route }) => {
    const data = route.params.data;
    const nextRoute = route.params.nextRoute;

    const [loading, setLoading] = React.useState(true);
    const [questionIndex, setQuestionIndex] = React.useState();
    const [error, setError] = React.useState();
    const [startDateAndTime, setStartDateAndTime] = React.useState(Date.now());
    const [gameData, setGameData] = React.useState();

    const onItemSelected = (item) => {
        if (item === gameData[questionIndex].correctAnswer) {
            correctAnswer++;
        }

        if (questionIndex + 1 === parseInt(data.questionNo, 10)) {
            endGame(startDateAndTime, correctAnswer, navigation, nextRoute);
            return;
        }

        setQuestionIndex(questionIndex + 1);
    };

    React.useEffect(() => {
        correctAnswer = 0;

        switch (data.type) {
            case GameModes.GuessTheNeighbor:
                generateGuessTheNeighbourQuestions(data.region, data.questionNo)
                    .then((resp) => {
                        setGameData(resp);
                        setQuestionIndex(0);
                        setLoading(false);
                        setStartDateAndTime(Date.now());
                    })
                    .catch((err) => {
                        setError(err);
                        setLoading(false);
                    });
                break;
            case GameModes.GuessTheFlag:
                generateGuessFlagQuestions(data.region, data.questionNo)
                    .then((resp) => {
                        setGameData(resp);
                        setQuestionIndex(0);
                        setLoading(false);
                        setStartDateAndTime(Date.now());
                    })
                    .catch((err) => {
                        setError(err);
                        setLoading(false);
                    });
                break;
            case GameModes.GuessTheCapital:
                generateGuessCapitalQuestions(data.region, data.questionNo)
                    .then((resp) => {
                        setGameData(resp);
                        setQuestionIndex(0);
                        setLoading(false);
                        setStartDateAndTime(Date.now());
                    })
                    .catch((err) => {
                        setError(err);
                        setLoading(false);
                    });
                break;

            default:
                break;
        }
    }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            {loading && !error && (<ActivityIndicator style={styles.center} size="large" color={Colors.primary} />)}
            {!loading && !error && data.type === GameModes.GuessTheCapital && (
                <GuessTheCapital data={gameData[questionIndex]} onItemSelected={onItemSelected} />
            )}
            {!loading && !error && data.type === GameModes.GuessTheFlag && (
                <GuessTheFlag data={gameData[questionIndex]} onItemSelected={onItemSelected} />
            )}
            {!loading && !error && data.type === GameModes.GuessTheNeighbor && (
                <GuessTheNeighbor data={gameData[questionIndex]} onItemSelected={onItemSelected} />
            )}
            {error && (<Error />)}
        </SafeAreaView >
    );
};

export default QuestionsScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    image: {
        alignSelf: 'center',
        width: 250,
        height: 125,
        marginTop: 20,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    list: {
        flexDirection: 'row',
    },
    listItem: {
        width: 250,
        height: 60,
        backgroundColor: Colors.primary,
        margin: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    centeredText: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

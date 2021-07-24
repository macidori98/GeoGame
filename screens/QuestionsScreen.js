import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import Error from '../components/Error';
import { generateGuessCapitalQuestions, generateGuessFlagQuestions, generateGuessTheNeighbourQuestions } from '../utils/RandomQuestionSelector';
import Colors from '../theme/Colors';
import moment from 'moment';
import { getDurationString } from '../utils/Helpers';

var correctAnswer;

const QuestionsScreen = ({ navigation, route }) => {
    const data = route.params.data;
    const [loading, setLoading] = React.useState(true);
    const [questionIndex, setQuestionIndex] = React.useState();
    const [error, setError] = React.useState();
    const [startDateAndTime, setStartDateAndTime] = React.useState(Date.now());
    const [gameData, setGameData] = React.useState();

    const onItemSelected = (item) => {
        if (item == gameData[questionIndex].correctAnswer) {
            correctAnswer++;
        }

        if (questionIndex + 1 == data.questionNo) {
            endGame();
            return;
        }

        setQuestionIndex(questionIndex + 1);
    };

    const endGame = () => {
        var endDate = Date.now();
        var durationInMillis = endDate - startDateAndTime;

        var duration = getDurationString(durationInMillis);

        navigation.navigate(route.params.nextRoute, {
            data: {
                correctAns: correctAnswer,
                startDate: moment(startDateAndTime).format('DD MMM yyyy, HH:mm'),
                duration: duration,
            },
        });
    };

    React.useEffect(() => {
        correctAnswer = 0;

        switch (data.type) {
            case 'Guess the neighbor':
                generateGuessTheNeighbourQuestions(data.region, data.questionNo)
                    .then((resp) => {
                        setGameData(resp);
                        setQuestionIndex(0);
                        setLoading(false);
                        setStartDateAndTime(Date.now());
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err);
                        setLoading(false);
                    });
                break;
            case 'Guess the flag':
                generateGuessFlagQuestions(data.region, data.questionNo)
                    .then((resp) => {
                        setGameData(resp);
                        setQuestionIndex(0);
                        setLoading(false);
                        setStartDateAndTime(Date.now());
                    })
                    .catch((err) => {
                        console.log(err);
                        setError(err);
                        setLoading(false);
                    });
                break;
            case 'Guess the capital':
                generateGuessCapitalQuestions(data.region, data.questionNo)
                    .then((resp) => {
                        setGameData(resp);
                        setQuestionIndex(0);
                        setLoading(false);
                        setStartDateAndTime(Date.now());
                    })
                    .catch((err) => {
                        console.log(err);
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
            {!loading && !error && data.type === 'Guess the capital' && (
                <View>
                    <View>
                        <Text style={styles.question}>{data.type} of {gameData[questionIndex].country}</Text>
                    </View>
                    <View style={styles.list}>
                        <FlatList
                            data={gameData[questionIndex].options}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => onItemSelected(item)}>
                                    <Text style={styles.centeredText}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>} />
                    </View>
                </View>
            )}
            {!loading && !error && data.type === 'Guess the flag' && (
                <View>
                    <Text style={styles.question}>
                        {data.type}
                    </Text>
                    <Image
                        resizeMode={'cover'}
                        style={styles.image}
                        source={{ uri: `https://www.countryflags.io/${gameData[questionIndex].country}/shiny/64.png` }} />
                    <View style={styles.list}>
                        <FlatList
                            data={gameData[questionIndex].options}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => onItemSelected(item)}>
                                    <Text style={styles.centeredText}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>} />
                    </View>

                </View>

            )}
            {!loading && !error && data.type === 'Guess the neighbor' && (
                <View>
                    <Text style={styles.question}>
                        {data.type} of {gameData[questionIndex].country}
                    </Text>
                    <View style={styles.list}>
                        <FlatList
                            data={gameData[questionIndex].options}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => onItemSelected(item)}>
                                    <Text style={styles.centeredText}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>} />
                    </View>

                </View>

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

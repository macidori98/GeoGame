import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import Error from '../components/Error';
import { getRegionDetails } from '../services/service';
import { getRemainingData, randomQuestions } from '../utils/RandomQuestionSelector';
import Colors from '../theme/Colors';

const QuestionsScreen = ({ navigation, route }) => {
    const data = route.params.data;
    const [loading, setLoading] = React.useState(true);
    const [questionIndex, setQuestionIndex] = React.useState();
    const [gameQuestions, setGameQuestions] = React.useState([]);
    const [otherAnswers, setOtherAnswers] = React.useState([]);
    const [error, setError] = React.useState();
    const [correctAnswers, setCorrectAnswers] = React.useState(0);

    const onItemSelectedCapital = (item) => {
        if (questionIndex + 1 == data.questionNo) {
            navigation.navigate(route.params.nextRoute, {
                data: {
                    correctAns: correctAnswers,
                },
            });
            return;
        }

        if (item.capital == gameQuestions[questionIndex].capital) {
            setCorrectAnswers(correctAnswers + 1);
        }

        setQuestionIndex(questionIndex + 1);
    };

    const getAllAnswers = () => {
        var a = [...otherAnswers[questionIndex]];
        a.push(gameQuestions[questionIndex]);
        shuffle(a);
        return a;
    };

    const shuffle = (arr) => {
        var i, j, temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    };

    React.useEffect(() => {
        getRegionDetails(data.region)
            .then(resp => {
                const array = randomQuestions(resp, data.questionNo);
                setGameQuestions(array);

                setOtherAnswers(getRemainingData(array, resp));
                setQuestionIndex(0);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            });
    }, [data]);

    return (
        <SafeAreaView style={styles.container}>
            {loading && !error && (<ActivityIndicator style={styles.center} size="large" color={Colors.primary} />)}
            {!loading && !error && data.type === 'Guess the capital' && (
                <View>
                    <View>
                        <Text style={styles.question}>{data.type} of {gameQuestions[questionIndex].name}</Text>
                    </View>
                    <View style={styles.list}>
                        <FlatList
                            data={getAllAnswers()}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => onItemSelectedCapital(item)}>
                                    <Text style={styles.centeredText}>
                                        {item.capital}
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

import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import Error from '../components/Error';
import { getRegionDetails } from '../services/service';
import { getAllQuestions } from '../utils/RandomQuestionSelector';
import Colors from '../theme/Colors';
import moment from 'moment';
import { getDurationString, shuffle } from '../utils/Helpers';

const QuestionsScreen = ({ navigation, route }) => {
    const data = route.params.data;
    const [loading, setLoading] = React.useState(true);
    const [questionIndex, setQuestionIndex] = React.useState();
    const [gameQuestions, setGameQuestions] = React.useState([]);
    const [otherAnswers, setOtherAnswers] = React.useState([]);
    const [error, setError] = React.useState();
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [startDateAndTime, setStartDateAndTime] = React.useState(Date.now());

    const onItemSelectedCapital = (item) => {
        if (item.capital == gameQuestions[questionIndex].capital) {
            setCorrectAnswers(correctAnswers + 1);
        }

        if (questionIndex + 1 == data.questionNo) {
            var endDate = Date.now();
            var durationInMillis = endDate - startDateAndTime;

            var duration = getDurationString(durationInMillis);

            navigation.navigate(route.params.nextRoute, {
                data: {
                    correctAns: correctAnswers,
                    startDate: moment(startDateAndTime).format('DD MMM yyyy, HH:mm'),
                    duration: duration,
                },
            });

            return;
        }

        setQuestionIndex(questionIndex + 1);
    };

    const getAllAnswers = () => {
        var a = [...otherAnswers[questionIndex]];
        shuffle(a);
        return a;
    };

    React.useEffect(() => {
        getRegionDetails(data.region)
            .then(resp => {
                const array = getAllQuestions(resp, data.questionNo);
                setGameQuestions(array.correctAnswers);

                setOtherAnswers(array.allQuestions);
                setQuestionIndex(0);
                setLoading(false);
                setStartDateAndTime(Date.now());
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
                            keyExtractor={(item, index) => index}
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
            {!loading && !error && data.type === 'Guess the flag' && (
                <View>
                    <Text style={styles.question}>
                        {data.type}
                    </Text>
                    <Image
                        resizeMode={'cover'}
                        style={styles.image}
                        source={{ uri: `https://www.countryflags.io/${gameQuestions[questionIndex].alpha2Code}/shiny/64.png` }} />
                    <View style={styles.list}>
                        <FlatList
                            data={getAllAnswers()}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => onItemSelectedCapital(item)}>
                                    <Text style={styles.centeredText}>
                                        {item.name}
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

import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryList from '../components/CountryList';
import Error from '../components/Error';
import { getCountryDetailsWithBorders } from '../services/service';
import Colors from '../theme/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import HourList from '../components/HourList';

const dimensions = Dimensions.get('screen');

const CountryDetailScreen = ({ route, navigation }) => {
    const countryCode = route.params.countryCode;
    const nextRoute = route.params.nextRoute;

    const [countryData, setCountryData] = React.useState();
    const [borders, setBorders] = React.useState([]);
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);

        getCountryDetailsWithBorders(countryCode)
            .then(async resp => {
                setCountryData(resp.details);
                setBorders(resp.borderCountries);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [countryCode]);

    return (
        <React.Fragment>
            {loading && !error && (<ActivityIndicator style={style.container} size="large" color={Colors.primary} />)}
            {countryData && !error && !loading && (
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <View style={style.container}>
                                <View>
                                    <Image
                                        resizeMode={'cover'}
                                        style={style.image}
                                        source={{ uri: `https://www.countryflags.io/${countryData.alpha2Code}/shiny/64.png` }} />
                                    <Text style={style.centeredText}>{countryData.name} ({countryData.alpha2Code})</Text>
                                    <View style={style.rowContainer}>
                                        <Icon name={'home'} size={25} />
                                        <Text style={style.text}>
                                            Capital: {countryData.capital}
                                        </Text>
                                    </View>
                                    <View style={style.rowContainer}>
                                        <Icon name={'people'} size={25} />
                                        <Text style={style.text}>
                                            Population: {countryData.population}
                                        </Text>
                                    </View>
                                    <View style={style.rowContainer}>
                                        <Icon name={'earth'} size={25} />
                                        <Text style={style.text}>
                                            Area: {countryData.area}
                                        </Text>
                                    </View>
                                    <View style={style.rowContainer}>
                                        <Icon name={'card'} size={25} />
                                        <Text style={{ color: 'red', ...style.text }}>
                                            Currency: under work
                                        </Text>
                                    </View>
                                    <View style={style.rowContainer}>
                                        <Icon name={'time'} size={25} />
                                        <Text style={style.text}>
                                            Timezones:
                                        </Text>
                                    </View>
                                    <View style={style.center}>
                                        <HourList timezones={countryData.timezones} />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={style.centeredText}>Borders</Text>
                                </View>
                                {
                                    borders.length === 0 ? (
                                        <View style={style.noBorder}>
                                            <Text style={style.centeredText}>{countryData.name} does not have borders.</Text>
                                        </View>
                                    ) : (
                                        <View>
                                            <CountryList navigation={navigation} dataList={borders} route={nextRoute} />
                                        </View>
                                    )
                                }
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
            {error && (<Error />)}
        </React.Fragment>
    );
};

export default CountryDetailScreen;

const style = StyleSheet.create({
    image: {
        padding: 0,
        width: dimensions.width,
        margin: 0,
        height: dimensions.height / 4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    centeredText: {
        fontSize: 25,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        minHeight: 400,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,
    },
    rowContainer: {
        marginLeft: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    noBorder: {
        margin: 20,
        marginBottom: 100,
    },
});


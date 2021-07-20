import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import CountryList from '../components/CountryList';
import Error from '../components/Error';
import { getRegionDetails } from '../services/service';
import Colors from '../theme/Colors';

const RegionDetailScreen = ({ route, navigation }) => {
    const regionName = route.params.region;
    const nextRoute = route.params.nextRoute;

    const [regionData, setRegionData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRegionDetails(regionName)
            .then(resp => {
                setRegionData(resp);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [regionName]);

    return (
        <React.Fragment>
            <View style={styles.center}>
                <Text style={styles.text}>
                    {regionName}
                </Text>
            </View>
            {loading && (<ActivityIndicator style={styles.center} size="large" color={Colors.primary} />)}
            {regionData.length > 0 && !error && (
                <CountryList navigation={navigation} dataList={regionData} route={nextRoute} />
            )}
            {regionData.length === 0 && !loading && !error && (
                <View style={styles.center}>
                    <Text>
                        No data.
                    </Text>
                </View>
            )}
            {error && (<Error />)}
        </React.Fragment>
    );
};

export default RegionDetailScreen;

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
    },
});

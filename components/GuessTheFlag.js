import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GameModes } from '../utils/Constants';

class GuessTheFlag extends React.PureComponent {
    render() {
        const { data, onItemSelected } = this.props;

        return (
            <View>
                <Text style={styles.question}>
                    {GameModes.GuessTheFlag}
                </Text>
                <Image
                    resizeMode={'cover'}
                    style={styles.image}
                    source={{ uri: `https://www.countryflags.io/${data.country}/shiny/64.png` }} />
                <View style={styles.list}>
                    <FlatList
                        data={data.options}
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
        );
    }
}

export default GuessTheFlag;

const styles = StyleSheet.create({
    question: {
        margin: 20,
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

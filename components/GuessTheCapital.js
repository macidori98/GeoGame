import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../theme/Colors';
import { GameModes } from '../utils/Constants';

class GuessTheCapital extends React.PureComponent {
    render() {
        const { data, onItemSelected } = this.props;

        return (
            <View>
                <View>
                    <Text style={styles.question}>{GameModes.GuessTheCapital} of {data.country}</Text>
                </View>
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

export default GuessTheCapital;

const styles = StyleSheet.create({
    question: {
        margin: 20,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
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

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Colors from '../theme/Colors';

const dimensions = Dimensions.get('screen');

class ResultsCard extends React.PureComponent {
    render() {
        const { onItemClick, item } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    onItemClick(item);
                }}
                style={styles.container}
            >
                <Text>
                    {item.startDate}{'\n'}Correct answers: {item.correctAns}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default ResultsCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.width - 90,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        padding: 20,
        marginBottom: 15,
        marginRight: 25,
        marginLeft: 25,
    },
});

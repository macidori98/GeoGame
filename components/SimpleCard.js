import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../theme/Colors';

const propTypes = {
    item: PropTypes.string,
    onItemSelected: PropTypes.func,
};

class SimpleCard extends React.PureComponent {
    render() {
        const { item, onItemSelected } = this.props;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => onItemSelected(item)}>
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    }
}

SimpleCard.propTypes = propTypes;

export default SimpleCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: Colors.primary,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    text: {
        color: Colors.white,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        paddingTop: 15,
        paddingBottom: 15,
    },
});

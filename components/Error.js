import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const propTypes = {
    errorText1: PropTypes.string,
    errorText2: PropTypes.string,
};

const defaultProps = {
    errorText1: 'Oops! Something went wrong.',
    errorText2: 'Make sure you are online and restart the App',
};

const dimenions = Dimensions.get('screen');

class Error extends React.PureComponent {
    render() {
        const { errorText1, errorText2 } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{errorText1}</Text>
                <Text style={styles.text}>{errorText2}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: dimenions.height - dimenions.width,
        textAlignVertical: 'center',
    },
    text: {
        fontWeight: 'bold',
    },
});

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;

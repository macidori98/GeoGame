import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import CountryCard from './CountryCard';
import PropTypes from 'prop-types';

const propTypes = {
    dataList: PropTypes.array,
};
const dimensions = Dimensions.get('screen');


class CountryList extends React.PureComponent {

    render() {
        const { navigation, dataList, route } = this.props;

        return (
            <View>
                <FlatList
                    nestedScrollEnabled={true}
                    style={styles.list}
                    data={dataList}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => <CountryCard navigation={navigation} item={item} route={route} />} />
            </View>
        );
    }
}

CountryList.propTypes = propTypes;

export default CountryList;

const styles = StyleSheet.create({
    list: {
        marginBottom: 75,
        width: dimensions.width,
    },
});

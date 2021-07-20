import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import SimpleCard from './SimpleCard';

const dimensions = Dimensions.get('screen');

class SimpleList extends React.PureComponent {
    render() {
        const { navigation, dataList, onItemSelected } = this.props;

        return (
            <FlatList
                style={styles.list}
                data={dataList}
                keyExtractor={item => item.name}
                renderItem={({ item }) => <SimpleCard navigation={navigation} item={item.name} onItemSelected={onItemSelected} />} />
        );
    }
}

export default SimpleList;

const styles = StyleSheet.create({
    list: {
        height: dimensions.height - 100,
    },
});

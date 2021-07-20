import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const longToDate = function (millisec, time) {
    var date = new Date(millisec);
    var currentDate = Date();
    var offset = currentDate.substring(currentDate.length - 12, currentDate.length - 9);
    return date.setHours(date.getHours() + (time - offset));
};

class HourList extends React.PureComponent {
    state = {
        time: Date.now(),
    };
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { timezones } = this.props;
        return (
            <FlatList
                data={timezones}
                keyExtractor={item => item}
                renderItem={({ item }) => <Text style={style.text}>{item} {moment(longToDate(this.state.time, parseInt(String(item).substring(3, 6), 10))).format('HH:mm:ss ')}</Text>} /> //10 radix parameter -> milyen szamrendszer
        );
    }
}

export default HourList;

const style = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,
    },
});

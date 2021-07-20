import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, View, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const dimensions = Dimensions.get('screen');

class CountryCard extends React.PureComponent {
    render() {
        const { navigation, item, route } = this.props;

        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate(route, { countryCode: item.alpha2Code }); }}>
                <View style={style.contianer}>
                    <Image
                        resizeMode={'cover'}
                        style={style.image}
                        source={{ uri: `https://www.countryflags.io/${item.alpha2Code}/shiny/64.png` }} />
                    <Text style={style.countryName}>{item.name}</Text>
                    <Text style={style.countryCode}>{item.alpha2Code}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default CountryCard;

const style = StyleSheet.create({
    contianer: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: dimensions.width,
        maxHeight: 180,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center',
        margin: 15,
    },
    image: {
        padding: 0,
        width: 120,
        margin: 0,
        height: 80,
        alignSelf: 'auto',
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    countryName: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        flexShrink: 1,
        justifyContent: 'center',
    },
    countryCode: {
        fontStyle: 'italic',
        margin: 10,
        marginEnd: 20,
    },
});

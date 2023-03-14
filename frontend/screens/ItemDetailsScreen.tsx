import React from 'react';
import {View, Text, Alert, Image} from 'react-native';
import {Button, Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import Background from "../components/general/Background";


const ItemDetailsScreen = ({navigation, route}) => {
    const item = route.params.item.item ? route.params.item.item : route.params.item;
    return (
        <View style={styles.container}>
            <Background/>
            <Image source={{uri: item.image_url}} style={styles.coverImage}/>
            <View style={styles.itemsContainer}>
                <Text style={styles.heading}>{item.heading}</Text>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 10, marginBottom: 10}}/>
                <Text></Text>
                <Text>Description:</Text>
                <Text>{item.description}</Text>
                <View style={{position: 'absolute', bottom: 0, width: "112%"}}>
                    <Button label={"Back"} onPress={() => navigation.goBack()}
                    borderRadius={20} backgroundColor={Colors.red20}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    itemsContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        margin: 20,
        marginTop: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollBarItemsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 10,
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
});

export default ItemDetailsScreen;
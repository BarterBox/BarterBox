import {Image, Text, TouchableOpacity} from "react-native-ui-lib";
import React, {StyleSheet} from "react-native";
import Item from "../../types/Item";

export default function MarketplaceItemCard({item, onPress}:{item: Item, onPress: () => void}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <Image style={styles.image} source={{uri: item.image_url}}/>
            <Text style={styles.heading}>{item.heading}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        margin: 10,
        height: 170,
        width: 140,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 140,
        height: 100,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomColor: "#fff",
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        width: 140,
        height: 70,
        padding: 5,
        textAlignVertical: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
});
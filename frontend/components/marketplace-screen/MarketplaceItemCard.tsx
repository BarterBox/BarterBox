import React, {StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import Item from "../../types/Item";

export default function MarketplaceItemCard({item}:{item: Item}) {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.image} source={{uri: item.image_url}}/>
            <Text style={styles.heading}>{item.heading}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#d2d2d2",
        padding: 20,
        paddingTop: 40,
        borderRadius: 10,
        margin: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 200,
    },
    image: {
        width: 100,
        height: 100,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
    }
});
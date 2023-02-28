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
        borderRadius: 10,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 170,
        width: 140,
        padding: 28,
        borderWidth: 1,
    },
    image: {
        width: 139,
        height: 139,
        position: "absolute",
        top: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        bottom: 0,
        width: 140,
        textAlign: "center",
    }
});
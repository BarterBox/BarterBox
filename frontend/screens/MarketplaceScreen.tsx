import React, {useContext, useEffect, useState} from 'react';
import {View, ToastAndroid, StyleSheet} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Heading1 from "../components/Heading1";
import Item from "../types/Item";
import {getFirestoreCollectionDataWhere} from "../Firebase";
import MarketplaceItemCard from "../components/marketplace-screen/MarketplaceItemCard";

const MarketplaceScreen = () => {
    const {user} = useContext(AuthContext);
    const [items, setItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        const items = await getFirestoreCollectionDataWhere("items", "owner", "!=", user.uid);
        setItems(items as Item[]);
    }

    useEffect(() => {
        fetchItems().then(() => {
            ToastAndroid.show("Items fetched", ToastAndroid.SHORT)
        });
    }, []);

    return (
        <View style={styles.container}>
            <Heading1 text="Marketplace"/>
            <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                    <View key={index}>
                        <MarketplaceItemCard item={item}/>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 40,
    },
    itemsContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default MarketplaceScreen;
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
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
        fetchItems()
    }, []);

    return (
        <View style={styles.container}>
            <Heading1 text="Marketplace"/>
            <ScrollView onScrollToTop={fetchItems} style={styles.itemsContainer} contentContainerStyle={styles.scrollBarItemsContainer}>
                {items.map((item, index) => {
                    return <MarketplaceItemCard key={index} item={item}/>
                })}
            </ScrollView>
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
    },
    scrollBarItemsContainer: {
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    }
});

export default MarketplaceScreen;
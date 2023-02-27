import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Heading1 from "../components/Heading1";
import Item from "../types/Item";
import {getFirestoreCollectionDataWhere} from "../Firebase";
import CachedImage from 'react-native-expo-cached-image';

const MarketplaceScreen = () => {
    const {user} = useContext(AuthContext);
    const [items, setItems] = useState<Item[]>([]);

    const fetchItems = async () => {
        const items = await getFirestoreCollectionDataWhere("items", "owner", "!=", user.uid);
        setItems(items as Item[]);
    }

    useEffect(() => {
        fetchItems().then(() => ToastAndroid.show("Items fetched", ToastAndroid.SHORT));
    }, []);

    return (
        <View>
            <Heading1 text="Marketplace"/>
            {items.map((item, index) => (
                <View key={index}>
                    <CachedImage source={{uri: item.image_url}}/>
                    <Text>{item.heading}</Text>
                </View>
            ))}
        </View>
    );
}

export default MarketplaceScreen;
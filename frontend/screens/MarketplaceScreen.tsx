import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Button, Text} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Heading1 from "../components/Heading1";
import Item from "../types/Item";
import {getFirestoreCollectionDataWhere} from "../Firebase";
import MarketplaceItemCard from "../components/marketplace-screen/MarketplaceItemCard";
import ItemDetailsScreen from './ItemDetailsScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SearchBar } from '@rneui/themed';

const MarketplaceScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const [items, setItems] = useState<Item[]>([]);
    const [searchedItems, setSearchedItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");

    const fetchItems = async () => {
        const items = await getFirestoreCollectionDataWhere("items", "owner", "!=", user.uid);
        setItems(items as Item[]);
    }
   

     const updateSearch = (search) => {
        setSearch(search);
        searchData(search);
       
      };
      const searchData = (search) => {
        const searchedItems = [];
          for(let i=0; i<items.length; i++){
              if(items[i].heading.startsWith(search)){
                  searchedItems.push(items[i]);
              }
          }
          console.log(searchedItems.length);
          setSearchedItems(searchedItems)

  
      }
  

    useEffect(() => {
        fetchItems()
    }, []);

    return (
        <View style={styles.container}>
            <Heading1 text="Marketplace"/>
            <SearchBar
          placeholder="Seach Marketplace ..."
          onChangeText={updateSearch}
          value={search}          
        />

        <ScrollView onScrollToTop={fetchItems} style={styles.itemsContainer} contentContainerStyle={styles.scrollBarItemsContainer}>
                {
                    searchedItems.length > 0 ? searchedItems.map((item, index) => {
                        return <MarketplaceItemCard key={index} item={item}/>
                    } ) : items.map((item, index) => {
                        return <MarketplaceItemCard onPress={() => navigation.navigate('ItemDetails', {item:item})} item={item}/>
                    })
                }
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
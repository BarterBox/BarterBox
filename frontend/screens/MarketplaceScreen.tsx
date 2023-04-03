import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import { StyleSheet, ScrollView, Button, Text } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import Heading1 from "../components/Heading1";
import Item from "../types/Item";
import { getFirestoreCollectionDataWhere, getUserById, getItemsByCity} from "../Firebase";
import MarketplaceItemCard from "../components/marketplace-screen/MarketplaceItemCard";
import { SearchBar } from '@rneui/themed';
import { Image } from 'react-native';
import Background from "../components/general/Background";

const MarketplaceScreen = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState<Item[]>([]);
    const [searchedItems, setSearchedItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [category, setcategory] = React.useState('home');

    const handleChange = (event) => {
   
        setcategory(event.target.value);
        console.log('set category working  '+event.target.value);
  
        updatecategory(event.target.value);
        console.log('category working '+event.target.value);
      
      };
  
    const fetchItems = async () => {
        // const items = await getFirestoreCollectionDataWhere("items", "owner", "!=", user.uid);
        const userCity = await getUserById(user.uid).then((user) => user.city);
        const items = await getItemsByCity(userCity, user.uid);
        setItems(items as Item[]);
    }

    const updateSearch = (search) => {
        setSearch(search);
        searchData(search);
    };
    
    const searchData = (search) => {
        const searchedItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].heading.startsWith(search)) {
                searchedItems.push(items[i]);
            }
        }
        console.log(searchedItems.length);
        setSearchedItems(searchedItems)
    }

    const updatecategory = (category) => {
        searchCategory(category)

    };
    const searchCategory = (category) => {
        const searchedItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].category === category) {
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
            <Background/>
            <View marginB-20>
                <Heading1 text="BarterBox"/>
                <SearchBar
                    placeholder="Seach Marketplace ..."
                    onChangeText={updateSearch}
                    value={search}
                />
            </View>
            <div>

<label>

  Select a category: 
    <select value={category} onChange={handleChange}>

    <option value="vehicles">vehicles</option>

    <option value="womensclothing&shoes">womens clothing & shoes</option>

    <option value="mensclothing&shoes">mens clothing & shoes</option>

    <option value="furniture">furniture</option>
    <option value="electronics">electronics</option>

    <option value="appliances">appliances</option>
    <option value="baby">baby</option>
    <option value="booksfilmmusic">books, films & music</option>
    <option value="car">car</option>
    <option value="health&beauty">health & beauty</option>
    <option value="toys">toys</option>
    <option value="sports">sporting goods</option>


    </select>
 

</label>

</div>


            <ScrollView onScrollToTop={fetchItems} style={styles.itemsContainer} contentContainerStyle={styles.scrollBarItemsContainer}>
                {
                    searchedItems.length > 0 ? searchedItems.map((item, index) => {
                        return <MarketplaceItemCard key={index} item={item} onPress={() => navigation.navigate('ItemDetails', {item:item})}/>
                    }) : items.map((item, index) => {
                        return <MarketplaceItemCard key={index} onPress={() => navigation.navigate('ItemDetails', { item: item, userid: user.uid })} item={item} />
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
        backgroundColor: '#fff',
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
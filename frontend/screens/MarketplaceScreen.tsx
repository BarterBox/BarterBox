import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import {StyleSheet, ScrollView, Button, Text, Platform, ActionSheetIOS} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import Heading1 from "../components/Heading1";
import Item from "../types/Item";
import {getUserById, getItemsByCity} from "../Firebase";
import MarketplaceItemCard from "../components/marketplace-screen/MarketplaceItemCard";
import {SearchBar} from '@rneui/themed';
import Background from "../components/general/Background";
import {useFocusEffect} from '@react-navigation/native';
import {useActionSheet} from '@expo/react-native-action-sheet';


const MarketplaceScreen = ({navigation}) => {

    const {showActionSheetWithOptions} = useActionSheet();
    const {user} = useContext(AuthContext);
    const [items, setItems] = useState<Item[]>([]);
    const [searchedItems, setSearchedItems] = useState<Item[]>([]);
    const [search, setSearch] = useState("");
    const [category, setcategory] = React.useState('all');

    const options = [
        {label: 'All', value: 'all'},
        {label: 'Vehicles', value: 'vehicles'},
        {label: 'Womens clothing & shoes', value: 'womensclothing&shoes'},
        {label: 'Mens clothing & shoes', value: 'mensclothing&shoes'},

        {label: 'Furniture', value: 'furniture'},
        {label: 'Electronics', value: 'electronics'},
        {label: 'Appliances', value: 'appliances'},

        {label: 'Baby', value: 'baby'},
        {label: 'Books, films & music', value: 'booksfilmmusic'},

        {label: 'Health & beauty', value: 'health&beauty'},
        {label: 'Toys', value: 'toys'},
        {label: 'Sporting goods', value: 'sports'},
    ];


    const handleChange = (event) => {
        console.log(event);
        setcategory(event);
        updatecategory(event);
    };

    const fetchItems = async () => {
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
        setSearchedItems(searchedItems);
    }


    useFocusEffect(React.useCallback(() => {
        fetchItems()
    }, []));

    return (
            <View style={styles.container}>
                <Background/>
                <View marginB-20>
                    <Heading1 text="BarterBox"/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.searchbar}>
                            <SearchBar
                                placeholder="Seach Marketplace ..."
                                onChangeText={updateSearch}
                                value={search}
                            />
                        </View>
                        <View style={styles.picker}>
                            <Text onPress={
                                () => {
                                    showActionSheetWithOptions({
                                            options: options.map((option) => option.label),
                                            cancelButtonIndex: 0,
                                        }, (buttonIndex) => {
                                            handleChange(options[buttonIndex].value)
                                        }
                                    )
                                }
                            }
                                  style={styles.pickerInner}>{options.find((option) => option.value === category).label}</Text>
                        </View>
                    </View>
                </View>


                <ScrollView onScrollToTop={fetchItems} style={styles.itemsContainer}
                            contentContainerStyle={styles.scrollBarItemsContainer}>
                    {
                        searchedItems.length > 0 ? searchedItems.map((item, index) => {
                            return <MarketplaceItemCard key={index} item={item}
                                                        onPress={() => navigation.navigate('ItemDetails', {item: item})}/>
                        }) : null
                    }
                    {
                        (searchedItems.length == 0 && category === 'all') ? items.map((item, index) => {
                            return <MarketplaceItemCard key={index} onPress={() => navigation.navigate('ItemDetails', {
                                item: item,
                                userid: user.uid
                            })} item={item}/>
                        }) : null
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
    },
    picker: {
        width: '30%',
        height: 65,
        marginLeft: "5%",
        backgroundColor: '#393e42',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pickerInner: {
        backgroundColor: "#303337",
        color: '#86939e',
        height: 50,
        width: "90%",
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    searchbar: {
        width: '65%',
    }
});

export default MarketplaceScreen;
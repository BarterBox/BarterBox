import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Heading1 from '../components/Heading1';
import { AuthContext } from '../navigation/AuthProvider';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from '../Firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MarketplaceItemCard from '../components/marketplace-screen/MarketplaceItemCard';

const database = getFirestore(app);

const MyItemsScreen = ({ navigation }) => {

	const [userName, setUserName] = useState("User");
	const [userOwnItems, setUserOwnItems] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const userSelection = doc(database, "Users", user.uid);
		getDoc(userSelection)
			.then((userSnapshot) => { return userSnapshot.data(); })
			.then((userAttributes) => { return userAttributes.displayName; })
			.then((name) => { setUserName(name); })
			.catch((error) => { setUserName("N/A"); });

		const ownItemSelection = query(collection(database, "items"), where("owner", "==", user.uid));
		getDocs(ownItemSelection)
			.then((itemSnapshot) => {
				return itemSnapshot.docs.map((doc, index) => {
					const { date_uploaded, description, heading, image_url, owner } = doc.data();
					const item = { date_uploaded, description, heading, image_url, owner };
					return { id: `${index}`, item: item };
				});
			})
			.then((items) => { setUserOwnItems(items); })
			.catch((error) => { setUserOwnItems([]); });

	}, []);

	const handleAddItem = () => {
		navigation.navigate('NewItem')
	}

	const Separator = ({ }) => {
		return <View style={{ height: 5 }}></View>;
	}
	const Footer = <View style={{ height: 5 }}></View >
	const KeyExtractFunction = item => item.id;
	const RenderFunction = ({ item }) => <MarketplaceItemCard onPress={() => navigation.navigate('ItemDetails', {item:item})} item={item.item} />

	return (
		<View style={styles.container}>
			<Heading1 text={`${userName}'s items`} />
			<FlatList
				data={userOwnItems}
				ItemSeparatorComponent={Separator}
				ListFooterComponent={<Button title="+" onPress={handleAddItem} />}
				renderItem={RenderFunction}
				keyExtractor={KeyExtractFunction}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: "scroll",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 35,
	},
});

export default MyItemsScreen;
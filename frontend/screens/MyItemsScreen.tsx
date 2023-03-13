import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import Heading1 from '../components/Heading1';
import { AuthContext } from '../navigation/AuthProvider';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from '../Firebase';
import {View, Button, Colors} from 'react-native-ui-lib';
import MarketplaceItemCard from '../components/marketplace-screen/MarketplaceItemCard';

const database = getFirestore(app);

const MyItemsScreen = ({ navigation }) => {

	const [userName, setUserName] = useState("User");
	const [userOwnItems, setUserOwnItems] = useState([]);
	const [userLoanItems, setUserLoanItems] = useState([]);
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

		const loanSelection = query(collection(database, "loans"), where("borrower", "==", user.uid));
		getDocs(loanSelection)
			.then((loanSnapshot) => { return loanSnapshot.docs.map((doc, index) => { return doc.data().item; }); })
			.then(async (items) => {	//this is the only way I was able to have loaned items' names show
				let itemTypes = [];
				let index = 0;
				for (const item of items) {
					const itemSelection = doc(database, "items", item);
					await (getDoc(itemSelection)
						.then((itemSnapshot) => { return itemSnapshot.data(); })
						//.then((itemAttributes) => { return itemAttributes.heading; })
						//.then((heading) => { itemHeaders.push({ id: `${index}`, heading: `${heading}` }) }))
						.then((itemAttributes) => {
							const { date_uploaded, description, heading, image_url, owner } = itemAttributes;
							const itemType = { date_uploaded, description, heading, image_url, owner };
							itemTypes.push({ id: `${index}`, item: itemType });
						})
						.catch((error) => { }));
					index++;
				}
				setUserLoanItems(itemTypes);
			})
			.catch((error) => { return []; });

	}, []);

	const handleAddItem = () => {
		navigation.navigate('NewItem')
	}
	const Footer = <View style={{ height: 5 }}></View >
	const KeyExtractFunction = item => item.id;
	const RenderFunction = ({ item }) => <MarketplaceItemCard onPress={() => navigation.navigate('ItemDetails', {item:item})} item={item.item} />

	return (
		<View style={styles.container}>
			<Heading1 text={`${userName}'s Items`}/>
			<Text style={styles.smallTitle}>Borrowed items</Text>
			<FlatList
				contentContainerStyle={{
					alignItems: "center",
					justifyContent: "center",

				}}
				horizontal={true}
				data={userLoanItems}
				keyExtractor={KeyExtractFunction}
				renderItem={RenderFunction}
				ListFooterComponent={Footer}
			/>
			<View style={{
				height: 5,
				backgroundColor: "#000",
				shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
				width: "120%",
				marginLeft: -20,
				marginTop: -5,

			}}></View>
			<Text style={styles.smallTitle}>Listings</Text>
			<FlatList
				contentContainerStyle={{
					alignItems: "center",
					justifyContent: "center",
				}}
				horizontal={true}
				data={userOwnItems}
				keyExtractor={KeyExtractFunction}
				renderItem={RenderFunction}
				ListFooterComponent={Footer}
			/>
			<Button
				label="+"
				labelStyle={{ fontSize: 30, color: Colors.white }}
				style={{
					position: "absolute",
					bottom: 20,
					right: 20,
					width: 60,
					height: 60,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: Colors.blue30,
				}}
				round
				onPress={handleAddItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 40,
		backgroundColor: '#fff',
		overflow: "scroll",
	},
	smallTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 0,
	},
});

export default MyItemsScreen;
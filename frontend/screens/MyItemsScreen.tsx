import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import Heading1 from '../components/Heading1';
import { AuthContext } from '../navigation/AuthProvider';
import { getFirestore, collection, query, where, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import { app } from '../Firebase';
import { Colors } from 'react-native-ui-lib';
import MarketplaceItemCard from '../components/marketplace-screen/MarketplaceItemCard';
import Background from "../components/general/Background";

const database = getFirestore(app);

let unsubItems;
let unsubLoans;

const MyItemsScreen = ({ navigation }) => {

	const [tick, setTick] = useState(1)
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
		unsubItems = onSnapshot(ownItemSelection, (snapshot) => {
			setUserOwnItems(snapshot.docs.map((doc, index) => {
				const { borrowed, borrowed_by, category, date_uploaded, description, heading, image_url, owner, return_ready } = doc.data();
				const item = { borrowed, borrowed_by, category, date_uploaded, description, heading, image_url, owner, return_ready, id: doc.id };
				return { id: `${index}`, item: item };
			}))
		})

		const loanSelection = query(collection(database, "loans"), where("borrower", "==", user.uid));
		unsubLoans = onSnapshot(loanSelection, (snapshot) => {
			Promise.all(
				snapshot.docs.map((doc) => { return doc.data().item })
					.map((item, index) => {
						return getDoc(doc(database, "items", item))
							.then((itemSnapshot) => { return itemSnapshot.data() })
							.then((itemAttributes) => {
								const { borrowed, borrowed_by, category, date_uploaded, description, heading, image_url, owner, return_ready } = itemAttributes;
								const itemType = { borrowed, borrowed_by, category, date_uploaded, description, heading, image_url, owner, return_ready, item };
								return { id: `${index}`, item: itemType };
							})
					})
			).then((loanItems) => { setUserLoanItems(loanItems) });
		})

		return () => { unsubItems(); unsubLoans(); }

	}, []);

	const handleAddItem = () => {
		navigation.navigate('NewItem')
	}
	const Footer = <View style={{ height: 5 }}></View >
	const KeyExtractFunction = item => item.id;
	const RenderFunction = ({ item }) => <MarketplaceItemCard onPress={() => navigation.navigate('ItemDetails', { item: item, userid: user.uid })} item={item.item}  />

	return (
		<View style={styles.container}>
			<Background />
			<Heading1 text={`${userName}'s Items`} />
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
				title="+"
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
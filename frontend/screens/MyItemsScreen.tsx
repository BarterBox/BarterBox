import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, SafeAreaView, ScrollView, SectionList, StyleSheet } from 'react-native';
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

	const Separator = ({ }) => {
		return <View style={{ height: 5 }}></View>;
	}
	const Footer = <View style={{ height: 5 }}></View >
	const KeyExtractFunction = item => item.id;
	const RenderFunction = ({ item }) => <MarketplaceItemCard onPress={() => navigation.navigate('ItemDetails', {item:item})} item={item.item} />

	return (
		<View style={styles.container}>
			<SectionList
				contentContainerStyle={{
					alignItems: "center",
					justifyContent: "center",
				}}
				sections={[{
					title: `${userName}'s Own Items`, data: userOwnItems
				}, {
					title: `${userName}'s Borrowed Items`, data: userLoanItems
				}]}
				keyExtractor={(item, index) => item.id}
				renderItem={RenderFunction}
				renderSectionHeader={({ section }) => (
					<Heading1 text={section.title}></Heading1>
				)}
				renderSectionFooter={({ section }) => {
					if (section.title == `${userName}'s Own Items`) { return <Button title="+" onPress={handleAddItem} /> }
				}}
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
		top: 35
	}
});

export default MyItemsScreen;
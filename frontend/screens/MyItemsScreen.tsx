import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Heading1 from '../components/Heading1';
import { AuthContext } from '../navigation/AuthProvider';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from '../Firebase';

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
			.then((itemSnapshot) => { return itemSnapshot.docs.map((doc, index) => { return { id: `${index}`, heading: `${doc.data().heading}` }; }); })
			.then((items) => { setUserOwnItems(items); })
			.catch((error) => { setUserOwnItems([]); });

	}, []);

	const handleAddItem = () => {
		navigation.navigate('NewItem')
	}

	const ListItem = ({ name }) => (
		<View style={styles.listitem}>
			<Text>{name}</Text>
		</View>
	);
	const Separator = ({ }) => {
		return <View style={{ height: 5 }}></View>;
	}
	const Footer = <View style={{ height: 5 }}></View >
	const KeyExtractFunction = item => item.id;
	const RenderFunction = ({ item }) => <ListItem name={item.heading} />

	return (
		<View style={styles.container}>
			<Heading1 text={`${userName}'s Own Items`}></Heading1>
			<FlatList
				data={userOwnItems}
				ItemSeparatorComponent={Separator}
				ListFooterComponent={Footer}
				renderItem={RenderFunction}
				keyExtractor={KeyExtractFunction}
			/>
			<Button title="+" onPress={handleAddItem} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: "scroll",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: 20,
		marginBottom: 20
	},
	listitem: {
		backgroundColor: "#0AF",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "flex-start",
		paddingVertical: 12,
		paddingHorizontal: 32,
	}
});

export default MyItemsScreen;
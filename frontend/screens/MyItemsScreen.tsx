import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import Heading1 from '../components/Heading1';
import { AuthContext } from '../navigation/AuthProvider';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from '../components/new-item-screen/../../Firebase';

const database = getFirestore(app);

const MyItemsScreen = ({ navigation }) => {

	const [userName, setUserName] = useState("");
	const [userItems, setUserItems] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const userSelection = query(collection(database, "Users"), where("email", "==", user.email));
		getDocs(userSelection)
			.then((userSnapshot) => { return userSnapshot.docs[0].data(); })
			.then((userAttributes) => { return userAttributes.displayName; })
			.then((name) => { setUserName(name); });

		const itemSelection = query(collection(database, "items"), where("owner", "==", user.uid));
		getDocs(itemSelection)
			.then((itemSnapshot) => { return itemSnapshot.docs.map((doc, index) => { return { id: `${index}`, description: `${doc.data().description}` }; }); })
			.then((items) => { setUserItems(items); });
	});

	const handleAddItem = () => {
		navigation.navigate('NewItem')
	}

	const ListItem = ({ description }) => (
		<View style={styles.container}>
			<Text>{description}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Heading1 text={`${userName}'s Items`}></Heading1>
			<FlatList
				data={userItems}
				renderItem={({ item }) => <ListItem description={item.description} />}
				keyExtractor={item => item.id}
			/>
			<Button title="+" onPress={handleAddItem} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MyItemsScreen;
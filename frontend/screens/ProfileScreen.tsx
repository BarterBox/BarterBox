import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native-ui-lib';
import { Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import  {app} from '../Firebase';
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import BBButton from "../components/general/BBButton";
const db = getFirestore(app);

const ProfileScreen = ({navigation}) => {
	const { user, logout } = useContext(AuthContext);
	const [name, setName] = useState('');
	const [about] = useState('I am a person');
	const [country, setCountry] = useState('');
	const [city, setCity] = useState('');
	const [imageUrl, setImageUrl] = useState(null);


	useEffect(() => {
		getDoc(doc(db, "Users", user.uid))
		.then(snapshot => {
			if (snapshot.exists) {
				const data = snapshot.data();
				setName(data.displayName);
				setCountry(data.country);
				setCity(data.city);
				setImageUrl(data.image_url);
				console.log(imageUrl);
				console.log(data);
			} else {
				console.log("No such document!");
			}
		})
		.catch(error => {
			console.log("Error getting documents: ", error);
		});
	}, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
			<View style={styles.container}>
				<Image
					style={styles.userImg}
					source={{
						uri: imageUrl
					}}
				/>
				<Text style={styles.userName}>{name}</Text>
				<Text style={styles.aboutUser}>
					{about}
				</Text>
				<View style={styles.userInfoWrapper}>
					<BBButton label={"Edit"} onPress={() => {navigation.navigate('Editor')}} />
					<BBButton label={"Logout"} onPress={() => {logout(); Alert.alert("You have successfully logged out.")}} />
				</View>
				<View style={styles.userInfoWrapper}>
					<View style={styles.userInfoItem}>
						<Text style={styles.userInfoTitle}>5 stars</Text>
						<Text style={styles.userInfoSubTitle}>Rating</Text>
					</View>
				</View>
				<View style={styles.userInfoWrapper}>
					<View style={styles.userInfoItem}>
						<Text style={styles.userInfoTitle}>{city}</Text>
						<Text style={styles.userInfoSubTitle}>{country}</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
    );

}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#fff',
	  padding: 20,
	},
	userImg: {
	  height: 150,
	  width: 150,
	  borderRadius: 75,
	},
	userName: {
	  fontSize: 18,
	  fontWeight: 'bold',
	  marginTop: 10,
	  marginBottom: 10,
	},
	aboutUser: {
	  fontSize: 12,
	  fontWeight: '600',
	  color: '#666',
	  textAlign: 'center',
	  marginBottom: 10,
	},
	userInfoWrapper: {
	  flexDirection: 'row',
	  justifyContent: 'space-around',
	  width: '100%',
	  marginVertical: 20,
	},
	userInfoItem: {
	  justifyContent: 'center',
	},
	userInfoTitle: {
	  fontSize: 20,
	  fontWeight: 'bold',
	  marginBottom: 5,
	  textAlign: 'center',
	},
	userInfoSubTitle: {
	  fontSize: 12,
	  color: '#666',
	  textAlign: 'center',
	},
  });

export default ProfileScreen;

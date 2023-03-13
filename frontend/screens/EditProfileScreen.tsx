import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Platform, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickImage from '../components/PickImage';
import { db } from '../Firebase';
import { AuthContext } from '../navigation/AuthProvider';

const EditProfileScreen = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    
    const preUpdate = () => {
        try {
            getDoc(doc(db, "Users", user.uid))
            .then(snapshot => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    setUserData({...userData, 
                        displayName: data.displayName,
                        country: data.country,
                        city: data.city,
                        image_url: data.image_url
                    })
                }
            })
        } catch(e) {
            console.log(e)
        }
    }
    
    const performUpdate = async () => {
        try {
            setUserData({...userData, uid: user.uid})
            console.log("Updating User Data")
            await updateUser(userData)
            console.log("Update Complete")
        } catch(e) {
            console.log(e)
        }
    }

    const handlePickImage = async () => {
        const result = await PickImage()
        setUserData({...userData, image_url: result.assets[0].uri})
    }

    useEffect(() => {
        preUpdate();
        console.log(userData)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.action}>
                <FontAwesome name="user-o" size={20} />
                <TextInput
                    placeholder='Full Name'
                    placeholderTextColor="#666666"
                    onChangeText={(txt) => setUserData({...userData, displayName: txt})}
                    numberOfLines={1}
                    autoCorrect={false}
                    keyboardType={'default'}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <FontAwesome name="globe" color="#333333" size={20} />
                <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(txt) => setUserData({...userData, country: txt})}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <MaterialCommunityIcons
                    name="map-marker-outline"
                    color="#333333"
                    size={20}
                />
                <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    onChangeText={(txt) => setUserData({...userData, city: txt})}
                    style={styles.textInput}
                />
            </View>
            <TouchableOpacity style={styles.userBtn} onPress={() => handlePickImage()}>
                <Text style={styles.userBtnTxt}>Add Profile Picture</Text>
            </TouchableOpacity>
            <Button
                title='Update'
                onPress={ () => performUpdate() }
            />
        </View>
    );  
}

const styles = StyleSheet.create({
	container: {
        height: '100%',
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
    inputContainer: {
        width: '80%',
        height: 20,
        marginBottom: 20
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
    userBtnTxt: {
        color: '#2e64e5',
    }
})

export default EditProfileScreen
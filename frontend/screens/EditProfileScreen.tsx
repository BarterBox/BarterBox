import {doc, getDoc} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Colors, View} from 'react-native-ui-lib';
import {StyleSheet, TextInput, Platform, TouchableWithoutFeedback} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickImage from '../components/PickImage';
import {db} from '../Firebase';
import {AuthContext} from '../navigation/AuthProvider';
import BBButton from "../components/general/BBButton";
import Heading1 from "../components/Heading1";
import DismissKeyboard from "../components/DismissKeyboard";
import {useNavigation} from "@react-navigation/native";

const EditProfileScreen = () => {
    const {user, updateUser} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();

    const preUpdate = () => {
        try {
            getDoc(doc(db, "Users", user.uid))
                .then(snapshot => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        setUserData({
                            ...userData,
                            displayName: data.displayName,
                            country: data.country,
                            city: data.city,
                            image_url: data.image_url
                        })
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    const performUpdate = async () => {
        try {
            setUserData({...userData, uid: user.uid})
            console.log("Updating User Data")
            await updateUser(userData)
            console.log("Update Complete")
        } catch (e) {
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
        <TouchableWithoutFeedback onPress={() => DismissKeyboard()}>
            <View style={styles.container}>
                <Heading1 text={'Edit Profile'}/>
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20}/>
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
                    <FontAwesome name="globe" color="#333333" size={20}/>
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
                <BBButton label={'Add Profile Picture'} onPress={() => handlePickImage()}/>
                <View style={styles.action}>
                    <Button
                        label='Cancel'
                        borderRadius={10}
                        backgroundColor={Colors.red30}
                        onPress={() => navigation.goBack()}
                    />
                    <Button
                        label='Update'
                        borderRadius={10}
                        backgroundColor={Colors.green30}
                        onPress={() => performUpdate()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
})

export default EditProfileScreen
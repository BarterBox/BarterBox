import { defaultSpacing } from '@rneui/base';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';

const EditProfileScreen = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

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

    return (
        <View style={styles.container}>
            <View style={styles.action}>
                <TextInput
                    placeholder='Full Name'
                    placeholderTextColor="#666666"
                    value={userData ? userData.fullname : ''}
                    onChangeText={(txt) => setUserData({...userData, fullname: txt})}
                    numberOfLines={1}
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
                    value={userData ? userData.country : ''}
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
                    value={userData ? userData.city : ''}
                    onChangeText={(txt) => setUserData({...userData, city: txt})}
                    style={styles.textInput}
                />
            </View>
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
    }
})

export default EditProfileScreen
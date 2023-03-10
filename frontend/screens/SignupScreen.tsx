import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert, Platform, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickImage from '../components/PickImage';
import { AuthContext } from '../navigation/AuthProvider';


const SignUpScreen = ({navigation}) => {
    const { register } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            console.log("Registering User")
            await register(email, password, userData)
            console.log("User Registered")
        } catch(e) {
            console.log(e)
        }
    }

    const handlePickImage = async () => {
        const result = await PickImage()
        setUserData({...userData, image_url: result.assets[0].uri})
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
            <View style={styles.action}>
                <TextInput
                    placeholder='Email Address'
                    placeholderTextColor="#666666"
                    onChangeText={(email) => setEmail(email)}
                    numberOfLines={1}
                    value={email}
                    keyboardType={'email-address'}
                    style={styles.textInput}
                />
            </View>
            <View style={styles.action}>
                <TextInput
                    placeholder='Password'
                    placeholderTextColor="#666666"
                    onChangeText={(password) => setPassword(password)}
                    numberOfLines={1}
                    value={password}
                    keyboardType={'default'}
                    secureTextEntry={true}
                    style={styles.textInput}
                />
            </View>
            <TouchableOpacity style={styles.userBtn} onPress={() => handlePickImage()}>
                <Text style={styles.userBtnTxt}>Add Profile Picture</Text>
            </TouchableOpacity>
            <Button
                title='Sign Up'
                onPress={ () => registerUser() }
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

export default SignUpScreen;

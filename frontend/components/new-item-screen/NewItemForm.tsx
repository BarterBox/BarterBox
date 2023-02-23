import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, Button, StyleSheet, Pressable, Alert, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, addDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Platform } from 'react-native';

import { storage } from '../../Firebase';
import MultilineInput from '../MultilineInput';
import { app } from '../../Firebase';
import { AuthContext } from '../../navigation/AuthProvider';

function dismissKeyboard() { if (Platform.OS != "web") { Keyboard.dismiss(); } }
const db = getFirestore(app);

const NewItemForm = ({ onSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [image, setImage] = useState(null);
    const { user } = useContext(AuthContext)

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                setImage(result.uri);
            }
        }
    };

    const handleAddItem = async () => {
        try {
            // Upload the image to Firebase Storage
            const response = await fetch(image);
            const blob = await response.blob();
            const uuid = uuidv4();
            const imageRef = storage.ref().child(`images/${uuid}`);
            await imageRef.put(blob);
            await imageRef.put(blob);
            const imageUrl = await imageRef.getDownloadURL();
            // Add the item data to Firestore

            const itemsRef = collection(db, 'items');
            await addDoc(itemsRef, {
                heading: itemName,
                description: itemDescription,
                image_url: imageUrl,
                owner: user.uid,
                date_uploaded: serverTimestamp(),
            })

            // Reset the form
            setItemName('');
            setItemDescription('');
            setImage(null);
            Alert.alert('Success', 'Item was uploaded correctly.');
            onSubmit()
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while adding the item.');
        }
    };

    const handleSubmit = () => {
        // handle submission logic here
        console.log(itemName, itemDescription, image);
    };

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.container}>
                <Text>Title</Text>
                <TextInput
                    style={styles.textInput}
                    value={itemName}
                    onChangeText={text => setItemName(text)}
                />
                <Text>Description:</Text>
                <MultilineInput
                    placeholder="Enter the item description"
                    limit={255}
                    onChangeHandler={text => setItemDescription(text)} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <Pressable
                    style={styles.button}
                    onPress={pickImage}>
                    <Text style={styles.pressableText}>Add Image</Text>
                </Pressable>
                <Pressable
                    style={styles.submitButton}
                    onPress={handleAddItem} >
                    <Text style={styles.pressableText}>Submit</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default NewItemForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textInput: {
        width: "100%",
        height: "30px",
        borderColor: '#999',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#007AFF',
        marginTop: 10,
    },
    submitButton: {
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#007AFF',
        marginTop: 10,
        alignSelf: "flex-end",
        position: 'absolute',
        bottom: 35
    },
    pressableText: {
        color: 'white'
    }
});

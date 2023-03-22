import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, StyleSheet, Pressable, Alert, Keyboard } from 'react-native';
import { getFirestore, addDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { Platform } from 'react-native';
import PickImage from '../PickImage';
import { Button } from 'react-native-ui-lib';
import {Picker} from '@react-native-picker/picker';

import { storage } from '../../Firebase';
import MultilineInput from '../MultilineInput';
import { app } from '../../Firebase';
import { AuthContext } from '../../navigation/AuthProvider';
import {Colors} from "react-native-ui-lib";
import BBButton from "../general/BBButton";
import {useNavigation} from "@react-navigation/native";

function dismissKeyboard() { if (Platform.OS != "web") { Keyboard.dismiss(); } }
const db = getFirestore(app);

const NewItemForm = ({ onSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('book')
    const [itemDescription, setItemDescription] = useState('');
    const [image, setImage] = useState(null);
    const { user } = useContext(AuthContext)
    const navigation = useNavigation();

    const handleAddItem = async () => {
        try {
            // Upload the image to Firebase Storage
            const response = await fetch(image);
            const blob = await response.blob();
            const uuid = uuidv4();
            const imageRef = ref(storage, `images/${uuid}`);
            await uploadBytes(imageRef, blob);
            const imageUrl = await getDownloadURL(imageRef);
            // Add the item data to Firestore

            const itemsRef = collection(db, 'items');
            await addDoc(itemsRef, {
                heading: itemName,
                description: itemDescription,
                image_url: imageUrl,
                owner: user.uid,
                category: itemCategory,
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

    const handlePickImage = async () => {
        const result = await PickImage()
        setImage(result.assets[0].uri)
    }

    const options = [
        {label: 'Book', value: 'book'},
        {label: 'Clothing', value: 'clothing'},
        {label: 'Miscellaneous', value: 'miscellaneous'},
      ];

    return (
        <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.container}>
                <Text>Title</Text>
                <TextInput
                    style={styles.textInput}
                    value={itemName}
                    onChangeText={text => setItemName(text)}
                />
                <Text>Category</Text>
                <Picker
                    selectedValue={itemCategory}
                    onValueChange={(itemValue, itemIndex) => setItemCategory(itemValue)}
                    style={styles.picker}>
                    {options.map((option, index) => (
                    <Picker.Item key={index} value={option.value} label={option.label} />
                    ))}
                </Picker>
                <Text>Description:</Text>
                <MultilineInput
                    placeholder="Enter the item description"
                    limit={255}
                    onChangeHandler={text => setItemDescription(text)} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <BBButton label={'Add Profile Picture'} onPress={handlePickImage}/>
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
                        onPress={handleAddItem}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

export default NewItemForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: '100%',
        justifyContent: "center",
    },
    textInput: {
        width: "100%",
        height: 30,
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
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    picker: {
        width: '80%',
      },
      pickerInner: {
        color: 'blue',
      },
});

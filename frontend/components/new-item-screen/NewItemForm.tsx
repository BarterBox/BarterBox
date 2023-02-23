import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MultilineInput from '../MultilineInput';

const NewItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [image, setImage] = useState(null);

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

    const handleSubmit = () => {
        // handle submission logic here
        console.log(itemName, itemDescription, image);
    };

    return (
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
                style={styles.button}
                onPress={handleSubmit} >
                <Text style={styles.pressableText}>Submit</Text>
            </ Pressable>
        </View>
    );
};

export default NewItemForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    pressableText: {
        color: 'white'
    }
});

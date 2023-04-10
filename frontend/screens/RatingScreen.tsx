import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import BBButton from '../components/general/BBButton';
import {db} from '../Firebase';

const RatingScreen = ({navigation, route}) => {
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [userData, setUserData] = useState(null)
    const [itemData, setItemData] = useState(null)
    const borrowerName = route.params.params.borrowerName
    const borrowerId = route.params.params.borrowerid
    const ownerId = route.params.params.ownerid
    const item = route.params.params.item

    const preUpdate = () => {
        try {
            getDoc(doc(db, "Users", borrowerId))
                .then(snapshot => {
                    if (snapshot.exists) {
                        const data = snapshot.data();
                        setUserData({
                            ...userData,
                            displayName: data.displayName,
                            country: data.country,
                            city: data.city,
                            image_url: data.image_url,
                            rating: data.rating,
                            rating_count: data.rating_count,
                            rating_total: data.rating_total
                        })
                    }
                });
            getDoc(doc(db, "items", item))
                .then(snapshot => {
                    if(snapshot.exists) {
                        const data = snapshot.data();
                        setItemData({
                            ...itemData,
                            borrowed: data.borrowed,
                            borrowed_by: data.borrowed_by,
                            category: data.category,
                            date_uploaded: data.date_uploaded,
                            description: data.description,
                            heading: data.heading,
                            image_url: data.image_url,
                            owner: data.owner
                        })
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    const updateUserRating = async (rating) => {
        const count = userData.rating_count + 1
        const total = userData.rating_total + rating
        const new_rating = total/count
        await setDoc(doc(db, "Users", borrowerId), {
            displayName: userData.displayName,
            country: userData.country,
            city: userData.city,
            image_url: userData.image_url,
            rating: new_rating,
            rating_count: count,
            rating_total: total 
        })
        await setDoc(doc(db, "items", item), {
            borrowed: false,
            borrowed_by: "",
            category: itemData.category,
            date_uploaded: itemData.date_uploaded,
            description: itemData.description,
            heading: itemData.heading,
            image_url: itemData.image_url,
            owner: itemData.owner
        })
    }

    useEffect(() => {
        preUpdate()
    }, [])

    const starImageFilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    const starImageUnfilled = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    const RatingBar = () => {
        return(
            <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={item}
                  onPress={() => setDefaultRating(item)}>
                  <Image
                    style={styles.starImageStyle}
                    source={
                      item <= defaultRating
                        ? {uri: starImageFilled}
                        : {uri: starImageUnfilled}
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        );
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <Text style={styles.textStyle}>
                How was your experience with {borrowerName}
            </Text>
            <Text style={styles.textStyleSmall}>
                Please Rate The Interaction
            </Text>
            <RatingBar />
            <Text style={styles.textStyle}>
                {defaultRating} / {Math.max.apply(null, maxRating)}
            </Text>
            <BBButton
                label='Rate The User'
                onPress={() => {
                    updateUserRating(defaultRating);
                    navigation.goBack() 
                }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        textAlign: 'center',
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        marginTop: 15,
    },
    buttonStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
    },
    buttonTextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    starImageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
});

export default RatingScreen

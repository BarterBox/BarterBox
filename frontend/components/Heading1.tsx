import {Image, Text, View} from 'react-native-ui-lib'
import React from 'react'

export default function Heading1({ text, img }: { text: string, img?: string}) {
    return (
        <View row marginT-20 marginB-20>
            {img && <Image source={{uri:img}} style={{width: 50, height: 50}}/>}
            <Text text50>{text}</Text>
        </View>
    )
}
import React from 'react';
import {Image} from "react-native";

function Background() {
    return (
        <Image source={require('../../assets/bg.png')} style={{position: 'absolute', flex: 1, resizeMode: 'cover'}}/>
    );
}

export default Background;
import React from 'react';
import {Button, Colors} from "react-native-ui-lib";

function BbButton({label, onPress}: { label: string, onPress: () => void }) {
    return (
        <Button outline borderRadius={10} backgroundColor={Colors.blue40} text70 label={label}
                onPress={onPress}
        />
    );
}

export default BbButton;
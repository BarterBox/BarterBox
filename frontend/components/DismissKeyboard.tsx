import { Platform, Keyboard } from 'react-native';

export default function DismissKeyboard() {
    if (Platform.OS != "web"){ Keyboard.dismiss(); } 
}
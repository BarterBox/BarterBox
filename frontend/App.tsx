import React, {useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {ChatRedirectContext} from "./context/Context";

import Providers from './navigation';
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

WebBrowser.maybeCompleteAuthSession()

const App = () => {
    const [chatRedirect, setChatRedirect] = useState(null);
    return (
        <ChatRedirectContext.Provider value={{chatRedirect, setChatRedirect}}>
            <ActionSheetProvider>
                <Providers/>
            </ActionSheetProvider>
        </ChatRedirectContext.Provider>
    );
};

export default App;
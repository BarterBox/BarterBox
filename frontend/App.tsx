import React, {useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {ChatRedirectContext} from "./context/Context";

import Providers from './navigation';

WebBrowser.maybeCompleteAuthSession()

const App = () => {
    const [chatRedirect, setChatRedirect] = useState(null);
    return (
        <ChatRedirectContext.Provider value={{chatRedirect, setChatRedirect}}>
            <Providers/>
        </ChatRedirectContext.Provider>
    );
};

export default App;
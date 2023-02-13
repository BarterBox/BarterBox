import React from "react";
import * as WebBrowser from "expo-web-browser";

import Providers from './navigation';

WebBrowser.maybeCompleteAuthSession()

const App = () => {
  return (
    <Providers />
  );
};

export default App;
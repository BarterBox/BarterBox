import { StyleSheet } from "react-native";
import { getFirestore} from "firebase/firestore";
import React, { useMemo, useState } from "react";
import * as WebBrowser from "expo-web-browser";

import Firebase from "./Firebase";
import Providers from './navigation';

// Initialize Cloud Firestore and get a reference to the service

const db = getFirestore(Firebase);

WebBrowser.maybeCompleteAuthSession()

const App = () => {
  return (
    <Providers />
  );
};

export default App;
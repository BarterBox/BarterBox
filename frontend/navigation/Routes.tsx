import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth"

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
import {app} from '../Firebase';

export default function Routes() {
    const auth = getAuth(app)
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    // Handle user state changes
    function onAuthChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }
    useEffect(() => {
      const subscriber = onAuthStateChanged(auth, onAuthChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
    if (loading) {
      return <Loading />;
    }
    return (
        <NavigationContainer>
          {user ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
      );
    }
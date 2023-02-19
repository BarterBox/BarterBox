import React, { createContext, useState, useMemo } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"

import Firebase from '../Firebase';
import { AuthContextType } from '../@types/app';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
    const auth = getAuth(Firebase)
    const [user, setUser] = useState(null);
    const [loginNotSignup, setLoginNotSignup] = useState(true)
    const authContextValue = useMemo(() => ({
        user,
        setUser,
        loginNotSignup,
        setLoginNotSignup,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await signOut(auth);
          } catch (e) {
            console.error(e);
          }
        },
        logOrSignup: () => {
          loginNotSignup === true ? setLoginNotSignup(false) : setLoginNotSignup(true)
        }
      }), [user])
    return (
      <AuthContext.Provider
        value={authContextValue}
      >
        {children}
      </AuthContext.Provider>
    );
  };
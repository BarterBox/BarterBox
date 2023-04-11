import React, { createContext, useState, useMemo } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"

import { app } from '../Firebase';
import { AuthContextType } from '../@types/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const db = getFirestore(app)
    const [user, setUser] = useState(null);
    const authContextValue = useMemo(() => ({
        user,
        setUser,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, userData) => {
          try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCreds.user.uid
            if (userData.image_url !== null) {
              await setDoc(doc(db, "Users", userId), {
                displayName: userData.fullname,
                email: email,
                country: userData.country,
                city: userData.city,
                image_url: userData.image_url
              })
            } else {
              await setDoc(doc(db, "Users", userId), {
                displayName: userData.fullname,
                email: email,
                country: userData.country,
                city: userData.city,
                image_url: null
              })
            }
          } catch (e) {
            console.log(e);
          }
        },
        updateUser: async(userData) => {
          await setDoc(doc(db, "Users", userData.uid), {
            displayName: userData.displayName,
            country: userData.country,
            city: userData.city,
            image_url: userData.image_url,
            rating: userData.rating
          })
        },
        logout: async () => {
          try {
            await signOut(auth);
          } catch (e) {
            console.error(e);
          }
        },
      }), [user])
    return (
      <AuthContext.Provider
        value={authContextValue}
      >
        {children}
      </AuthContext.Provider>
    );
  };
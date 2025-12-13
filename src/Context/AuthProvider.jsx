import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const singIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logout = (email, password) => {
        setLoading(true);
        return signOut(auth);
    }

    const update = (displayName, photoURL) => {
        setUser({
            ...auth.currentUser,
            displayName,
            photoURL,
        });
        return updateProfile(auth.currentUser, { displayName, photoURL });
    }

    const sendPassResetEmail = async (email) => {
       if (!email) {
      throw new Error("give email");
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      return Promise.resolve(); 
    } finally {
      setLoading(false); 
    }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        })
        return () => {
            unsubscribe();
        }
    }, [])
    const authData = {
        createUser,
        user,
        setUser,
        singIn,
        loading,
        setLoading,
        logout,
        googleSignIn,
        update,
        sendPassResetEmail

    }
    return (
        <AuthContext value={authData}>{children}</AuthContext>
    );
};

export default AuthProvider;
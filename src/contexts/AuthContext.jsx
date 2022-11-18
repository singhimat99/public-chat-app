import React, { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, firestore } from "../Firebase";
import Loading from "../pages/Loading";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  if (currentUser) {
  }
  function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function anonLogin(auth) {
    return signInAnonymously(auth);
  }
  function signOut() {
    let isAnon = currentUser.isAnonymous;
    auth.signOut();
    isAnon && deleteUser(currentUser);
  }
  function forgotPassword(auth, email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return unsubscribe;
  }, []);

  if (pending) {
    return <Loading />;
  }

  const value = {
    currentUser,
    signup,
    login,
    anonLogin,
    signOut,
    forgotPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

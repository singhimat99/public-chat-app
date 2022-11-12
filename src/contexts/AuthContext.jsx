import React, { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function anonLogin(auth) {
    return signInAnonymously(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setPending(false);
    });
    return unsubscribe;
  }, []);

  if (pending) {
    return <div>Loading...</div>;
  }

  const value = {
    currentUser,
    signup,
    login,
    anonLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

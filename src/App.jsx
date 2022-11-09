import React, { useState } from "react";
import SignIn from "./pages/SignIn.jsx";
import ChatRoom from "./pages/ChatRoom";
import "./App.scss";

import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDsqFhNswlx6kWo3T7K2DNhw8aweCdr7Ug",
  authDomain: "fir-chat-app-dc01f.firebaseapp.com",
  projectId: "fir-chat-app-dc01f",
  storageBucket: "fir-chat-app-dc01f.appspot.com",
  messagingSenderId: "1079412071470",
  appId: "1:1079412071470:web:0fe5196b62aa66d25353bf",
  measurementId: "G-YCZE03YBSE",
});

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <section className="content-wrapper">
        {user ? (
          <ChatRoom
            signOut={() => auth.signOut()}
            firestore={firestore}
            auth={auth}
          />
        ) : (
          <SignIn auth={auth} />
        )}
      </section>
    </div>
  );
}

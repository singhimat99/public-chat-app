import React, { useState } from "react";
import SignIn from "./pages/SignIn.jsx";
import ChatRoom from "./pages/ChatRoom";
import SignUp from "./pages/SignUp.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";

import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";

export default function App() {
  const [user] = useAuthState(auth);
  let loggedIn = false;
  if (user != null) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  return (
    <AuthProvider>
      <div className="App">
        <section className="content-wrapper">
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={loggedIn ? <ChatRoom /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
          {/* {user ? (
          <ChatRoom
          />
        ) : (
          <SignIn />
        )} */}
        </section>
      </div>
    </AuthProvider>
  );
}

import React, { useState } from "react";
import SignIn from "./pages/SignIn.jsx";
import ChatRoom from "./pages/ChatRoom";
import SignUp from "./pages/SignUp.jsx";
import DisplayName from "./pages/DisplayName.jsx";
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
import { useRef } from "react";
import { useEffect } from "react";

export default function App() {
  const [user] = useAuthState(auth);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user != null) {
      setLoggedIn(false);
      console.log("user does not exist");
    } else {
      setLoggedIn(true);
      console.log("user exists");
    }
  }, [user]);
  console.log(loggedIn, user);

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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/displayname" element={<DisplayName />} />
            </Routes>
          </Router>
        </section>
      </div>
    </AuthProvider>
  );
}

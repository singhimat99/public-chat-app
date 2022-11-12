import React, { useState } from "react";
import SignIn from "./pages/SignIn.jsx";
import ChatRoom from "./pages/ChatRoom";
import SignUp from "./pages/SignUp.jsx";
import DisplayName from "./pages/DisplayName.jsx";
import PrivateRoutes from "./pages/PrivateRoutes.jsx";
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
  return (
    <AuthProvider>
      <div className="App">
        <section className="content-wrapper">
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route exact path="/" element={<ChatRoom />} />
              </Route>
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/login" element={<SignIn />} />
              <Route exact path="/displayname" element={<DisplayName />} />
            </Routes>
          </Router>
        </section>
      </div>
    </AuthProvider>
  );
}

import React, { lazy, Suspense } from "react";
const ChatRoom = lazy(() => import("./pages/ChatRoom"));
const DisplayName = lazy(() => import("./pages/DisplayName.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
import PrivateRoutes from "./pages/PrivateRoutes.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Loading from "./pages/Loading.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import { AuthProvider } from "./contexts/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <section className="content-wrapper">
          <Router>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route exact path="/" element={<ChatRoom />} />
                </Route>
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/login" element={<SignIn />} />
                <Route exact path="/displayname" element={<DisplayName />} />
                <Route
                  exact
                  path="/forgotpassword"
                  element={<ForgotPassword />}
                />
              </Routes>
            </Suspense>
          </Router>
        </section>
      </div>
    </AuthProvider>
  );
}

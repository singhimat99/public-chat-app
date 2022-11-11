import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { firestore, auth } from "../Firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await login(auth, email, password);
      const user = response.user;
      navigate("/displayname");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  }
  return (
    <div className="signIn-page">
      <div className="log-in-container">
        <h2>Log In</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input type="email" ref={emailRef} placeholder="Email" />
          <input
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
          <button type="submit">Log In</button>
        </form>

        <div className="needs-account">
          Click here to <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../Firebase";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function resetInputFields() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }
  async function handleLogin(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setError("");
    try {
      const response = await login(auth, email, password);
      const user = response.user;
      navigate("/displayname");
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.error(errorCode, errorMessage);
      setError("Username or Password incorrect");
    }
    resetInputFields();
  }

  return (
    <div className="signIn-page">
      <div className="log-in-container">
        <h2>Log In</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input type="email" ref={emailRef} required placeholder="Email" />
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
        <br />
        <Link className="forgot-pass" to="/forgotpassword">
          Forgot Password?
        </Link>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

import React from "react";
import { useRef, useState } from "react";
import { auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup, anonLogin } = useAuth();
  const navigate = useNavigate();

  function resetInputFields() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  }
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/displayname");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }
  async function createNewUser(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setError("Passwords Do Not Match");
      setIsLoading(false);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await signup(auth, email, password);
      navigate("/displayname");
    } catch (error) {
      setError("Failed to Create an Account");
      console.log(error);
    }
    setIsLoading(false);
  }

  async function handleAnonSignIn(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await anonLogin(auth);
      const user = response.user;
      navigate("/displayname");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
    resetInputFields();
  }
  return (
    <div className="sign-up-container">
      <div className="sign-up">
        <h2>Sign Up</h2>
        <form className="sign-up-form" onSubmit={createNewUser}>
          <input type="email" ref={emailRef} required placeholder="Email" />
          <input
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
          <input
            type="password"
            ref={confirmPasswordRef}
            required
            placeholder="Retype Password"
          />
          <button type="submit" disabled={isLoading}>
            Create New Account
          </button>
        </form>
        <button onClick={signInWithGoogle} className="alt-signin-btn">
          Sign In with Google
        </button>
        <span>Or</span>

        <button onClick={handleAnonSignIn} className="alt-signin-btn">
          Sign in Anonymously
        </button>

        <div className="has-account">
          Already Have an Account? <Link to="/login">Log In</Link>
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

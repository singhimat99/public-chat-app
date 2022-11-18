import React, { useRef, useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  let timeoutID;
  clearTimeout(timeoutID);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;

    try {
      await forgotPassword(auth, email);
      setMessage("Password reset email sent!");
    } catch (e) {
      console.log(e);
      setError("email not found");
    }

    emailRef.current.value = "";

    if (error) return;

    timeoutID = setTimeout(() => {
      setError("");
      setMessage("");
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="forgotpass-container">
      <div className="forgotpass-form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            ref={emailRef}
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
        {message && <h6>{message}</h6>}
      </div>
    </div>
  );
}

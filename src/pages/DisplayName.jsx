import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

export default function DisplayName() {
  const { currentUser } = useAuth();
  const usernameRef = useRef();
  const navigate = useNavigate();
  console.log(currentUser);
  async function handleSubmit(e) {
    e.preventDefault();
    const username = usernameRef.current.value;
    try {
      await updateProfile(currentUser, {
        displayName: username,
      });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="displayname-container">
      <div className="displayname-form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Your Name" ref={usernameRef} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

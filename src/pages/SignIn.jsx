import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn({ auth }) {
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <div className="signIn-page">
      <button onClick={signInWithGoogle} className="signIn-btn">
        Sign In with Google
      </button>
    </div>
  );
}

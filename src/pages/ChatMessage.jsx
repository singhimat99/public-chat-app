import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { firestore, auth } from "../Firebase";
import { getAdditionalUserInfo } from "firebase/auth";

export default function ChatMessage({ message, fromCurrentUser, messageId }) {
  const { value, photoUrl, displayName } = message;
  const [miniMenuOpened, setMiniMenuOpened] = useState(false);
  const { currentUser } = useAuth();
  let messageStatus = "chat-message ";
  messageStatus += fromCurrentUser ? "sent" : "recieved";

  async function handleDelete() {
    await deleteDoc(doc(firestore, "messages", messageId));
    setMiniMenuOpened(false);
  }
  return (
    <div className={messageStatus}>
      <img
        src={photoUrl}
        alt="profile image"
        referrerPolicy="no-referrer"
        onClick={() => fromCurrentUser && setMiniMenuOpened((prev) => !prev)}
      />
      <div className="message-content">
        {displayName ? <h5>{displayName}</h5> : null}
        <p>{value}</p>
      </div>
      {miniMenuOpened && (
        <div className="mini-menu">
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

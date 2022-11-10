import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

import { firestore, auth } from "../Firebase";

export default function ChatMessage({ message, fromCurrentUser, messageId }) {
  const { value, photoUrl } = message;
  const [miniMenuOpened, setMiniMenuOpened] = useState(false);
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
      <p>{value}</p>
      {miniMenuOpened && (
        <div className="mini-menu">
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

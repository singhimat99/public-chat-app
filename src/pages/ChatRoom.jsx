import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { firestore, auth } from "../Firebase";
import ChatMessage from "./ChatMessage";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function ChatRoom() {
  const messagesRef = collection(firestore, "messages");
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef("");
  const scrollTo = useRef();
  const scrollToForm = useRef();
  const { currentUser, signOut } = useAuth();

  async function addNewMessage(e) {
    e.preventDefault();
    const newMessage = await addDoc(messagesRef, {
      value: currentMessage.current.value,
      createdAt: serverTimestamp(),
      userId: auth.currentUser.uid,
      photoUrl: auth.currentUser.photoURL,
      displayName: auth.currentUser.displayName,
    });
    currentMessage.current.value = "";
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
  }

  let cancelSnapshot;
  useEffect(() => {
    let messagesQuery;

    async function queryMessages() {
      messagesQuery = query(messagesRef, orderBy("createdAt"), limit(100));
      cancelSnapshot = onSnapshot(messagesQuery, (querySnapshot) => {
        setAllMessages(
          querySnapshot.docs.map((e) => {
            return { ...e.data(), id: e.id };
          })
        );
      });
    }
    queryMessages();
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
    return cancelSnapshot;
  }, []);
  return (
    <section className="chatRoom">
      <nav className="navbar">
        <p>🔥 💬</p>
        <h1>{currentUser.displayName}</h1>
        <button onClick={signOut} className="signOut-btn">
          Sign Out
        </button>
      </nav>
      <div className="messages-container">
        {allMessages.map((message) => {
          const fromCurrentUser = message.userId === auth.currentUser.uid;
          return (
            <ChatMessage
              key={message.id}
              messageId={message.id}
              message={message}
              firestore={firestore}
              fromCurrentUser={fromCurrentUser}
            />
          );
        })}
        <div ref={scrollTo}></div>
      </div>
      <form
        className="message-form"
        onSubmit={addNewMessage}
        ref={scrollToForm}
      >
        <input
          type="text"
          className="message-form-input"
          ref={currentMessage}
          required
          placeholder="Type Here..."
        />
        <button type="submit" className="message-form-sbmt-btn">
          <FiSend color="white" />
        </button>
      </form>
    </section>
  );
}

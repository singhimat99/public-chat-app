import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
} from "firebase/firestore";

import { firestore, auth } from "../Firebase";
import ChatMessage from "./ChatMessage";
import { GrSend } from "react-icons/gr";

export default function ChatRoom({ signOut }) {
  const messagesRef = collection(firestore, "messages");
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef("");
  const scrollTo = useRef();
  const scrollToForm = useRef();

  async function addNewMessage(e) {
    e.preventDefault();
    const newMessage = await addDoc(messagesRef, {
      value: currentMessage.current.value,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
      photoUrl: auth.currentUser.photoURL,
    });
    currentMessage.current.value = "";
    scrollTo.current.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    let cancelSnapshot;
    let messagesQuery;

    scrollToForm.current.scrollIntoView({ behavior: "smooth" });
    async function queryMessages() {
      messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
      cancelSnapshot = onSnapshot(messagesQuery, (querySnapshot) => {
        setAllMessages(
          querySnapshot.docs.map((e) => {
            return { ...e.data(), id: e.id };
          })
        );
      });
    }
    queryMessages();
    return cancelSnapshot;
  }, []);

  return (
    <section className="chatRoom">
      <nav className="navbar">
        <h1>🔥 💬</h1>
        <button onClick={() => auth.signOut()} className="signOut-btn">
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
          placeholder="Type Here..."
        />
        <button type="submit" className="message-form-sbmt-btn">
          <GrSend className="send-icon" />
        </button>
      </form>
    </section>
  );
}

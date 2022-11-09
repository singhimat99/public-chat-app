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
import ChatMessage from "./ChatMessage";
import { GrSend } from "react-icons/gr";

export default function ChatRoom({ signOut, firestore, auth }) {
  const messagesRef = collection(firestore, "messages");
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef("");

  async function addNewMessage(e) {
    e.preventDefault();
    const newMessage = await addDoc(messagesRef, {
      value: currentMessage.current.value,
      createdAt: new Date(),
      userId: auth.currentUser.uid,
      photoUrl: auth.currentUser.photoURL,
    });
    currentMessage.current.value = "";
  }
  useEffect(() => {
    let cancelSnapshot;
    async function queryMessages() {
      const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));
      // const querySnapshot = await getDocs(messagesQuery);
      // const allDocs = querySnapshot.docs;
      // allDocs.forEach((message) => {
      //   console.log(`Document ${message.id} Data: ${message.data().value}`);
      // });
      cancelSnapshot = onSnapshot(messagesQuery, (querySnapshot) => {
        setAllMessages(
          querySnapshot.docs.map((e) => {
            return { ...e.data(), id: e.id };
          })
        );
      });
    }
    queryMessages();
  }, []);

  console.log(currentMessage.current.value);
  return (
    <section className="chatRoom">
      <nav className="navbar">
        <h1>🔥</h1>
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
      </div>
      <form className="message-form" onSubmit={addNewMessage}>
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

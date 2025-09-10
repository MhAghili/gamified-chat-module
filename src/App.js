// src/App.js
import React, { useState, useEffect } from "react";
import { gamificationAPI } from "./gamification-module";
import ChatbotComponent from "./chatbot-host/ChatbotComponent";

const getOrSetUserId = () => {
  let userId = localStorage.getItem("chatbot_user_id");
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("chatbot_user_id", userId);
  }
  return userId;
};

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const userId = getOrSetUserId();
    gamificationAPI.init(userId);
  }, []);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div>
      <header style={{ padding: "20px", direction:"rtl", backgroundColor: "#eee" }}>
        <h1>پروژه چت‌بات گیمیفای‌شده</h1>
        <p>روی آیکون چت در پایین صفحه کلیک کنید.</p>
      </header>

      <button onClick={toggleChatbot} style={styles.floatingButton}>
        💬
      </button>

      {showChatbot && (
        <div style={styles.chatbotWrapper}>
          <ChatbotComponent />
        </div>
      )}
    </div>
  );
};

const styles = {
  chatbotWrapper: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    zIndex: 1000,
  },
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#6e48aa",
    color: "white",
    border: "none",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 1001,
  },
};

export default App;

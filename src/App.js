// src/App.js
import React, { useState, useEffect } from "react";
import { gamificationAPI } from "./gamification-module";
import ChatbotComponent from "./chatbot-host/ChatbotComponent";

const App = () => {
  // یک state برای مدیریت باز و بسته بودن چت‌بات
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    gamificationAPI.init("user-123");
  }, []);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div>
      <header style={{ padding: "20px", backgroundColor: "#eee" }}>
        <h1>پروژه چت‌بات گیمیفای‌شده</h1>
        <p>روی آیکون چت در پایین صفحه کلیک کنید.</p>
      </header>

      {/* دکمه شناور برای باز و بسته کردن چت‌بات */}
      <button onClick={toggleChatbot} style={styles.floatingButton}>
        {/* می‌توانید از یک عکس آیکون استفاده کنید */}
        💬
      </button>

      {/* چت‌بات فقط زمانی نمایش داده می‌شود که showChatbot برابر true باشد */}
      {showChatbot && (
        <div style={styles.chatbotWrapper}>
          <ChatbotComponent />
        </div>
      )}
    </div>
  );
};

// استایل‌های دکمه و پنجره شناور
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

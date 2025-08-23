// src/App.js
import React, { useEffect } from "react";
import { gamificationAPI } from "./gamification-module";
import ChatbotComponent from "./chatbot-host/ChatbotComponent";

function App() {
  useEffect(() => {
    // راه‌اندازی ماژول گیمیفیکیشن
    gamificationAPI.init("user-123");
    // شبیه‌سازی اولین رویداد برای امتیازدهی اولیه
    // ما این رویداد را قبل از نمایش کامپوننت چت‌بات فراخوانی می‌کنیم
    gamificationAPI.triggerEvent("INITIAL_INTERACTION");
  }, []);

  return (
    <div>
      <header style={{ padding: "20px", backgroundColor: "#eee" }}>
        <h1>پروژه چت‌بات گیمیفای‌شده</h1>
        <p>روی آیکون چت در پایین صفحه کلیک کنید.</p>
      </header>
      <ChatbotComponent />
    </div>
  );
}

export default App;

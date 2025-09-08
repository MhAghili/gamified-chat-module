// src/chatbot-host-example/ChatbotComponent.js
import React from "react";
import Chatbot from "react-chatbot-kit";
import { useState, useEffect } from "react";
import "react-chatbot-kit/build/main.css";

import createChatbotConfig from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

import "./ChatbotComponent.css"; // یک فایل CSS برای شخصی‌سازی ظاهر

const ChatbotComponent = () => {
  // یک state محلی برای نگهداری آبجکت config
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // ما ساختن config را به داخل useEffect منتقل می‌کنیم.
    // useEffect بعد از اولین رندر و آماده شدن همه چیز اجرا می‌شود.
    const chatbotConfig = createChatbotConfig();
    setConfig(chatbotConfig);
  }, []); // آرایه خالی یعنی این افکت فقط یک بار اجرا می‌شود

  // تا زمانی که config آماده نشده، هیچ چیزی (یا یک لودر) را نمایش نده
  if (!config) {
    return null;
  }

  return (
    <div className="chatbot-container">
      <Chatbot
        // از config که در state ذخیره شده استفاده می‌کنیم
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatbotComponent;

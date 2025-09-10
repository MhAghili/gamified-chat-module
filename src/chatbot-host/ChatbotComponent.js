import React from "react";
import Chatbot from "react-chatbot-kit";
import { useState, useEffect } from "react";
import "react-chatbot-kit/build/main.css";

import createChatbotConfig from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

import "./ChatbotComponent.css";

const ChatbotComponent = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const chatbotConfig = createChatbotConfig();
    setConfig(chatbotConfig);
  }, []);

  if (!config) {
    return null;
  }

  return (
    <div className="chatbot-container">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatbotComponent;

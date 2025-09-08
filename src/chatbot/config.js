// src/chatbot/config.js
import { createChatBotMessage } from "react-chatbot-kit";
import BadgeNotification from "../gamification-module/components/BadgeNotification";
import CustomHeader from "../gamification-module/components/CustomHeader";

import { gamificationAPI } from "../gamification-module";

// به جای یک آبجکت، یک تابع می‌سازیم
const createChatbotConfig = () => {
  // ۲. قبل از ساختن تنظیمات، نام کاربر را از store می‌خوانیم
  const { userName } = gamificationAPI.useStore.getState();

  // ۳. بر اساس وجود نام، پیام و مرحله اولیه را تعیین می‌کنیم
  const initialMessages = userName
    ? [
        createChatBotMessage(
          `سلام ${userName}، خوش برگشتی! هر سوالی داری بپرس.`
        ),
      ]
    : [
        createChatBotMessage(
          `سلام! به چت‌بات پشتیبانی خوش آمدید. لطفا نام خود را وارد کنید.`
        ),
      ];

  const conversationStage = userName ? "asking_questions" : "initial_greeting";

  return {
    initialMessages,
    botName: "پشتیبان گیمیفای‌شده",
    state: {
      conversationStage,
    },
    customComponents: {
      header: (props) => <CustomHeader {...props} />,
    },
    widgets: [
      {
        widgetName: "badgeNotification",
        widgetFunc: (props) => <BadgeNotification {...props} />,
      },
    ],
  };
};

export default createChatbotConfig;

// src/chatbot/config.js
import { createChatBotMessage } from "react-chatbot-kit";
import BadgeNotification from "../gamification-module/components/BadgeNotification";
// ۱. هدر سفارشی را وارد می‌کنیم
import CustomHeader from "../gamification-module/components/CustomHeader";

const config = {
  initialMessages: [
    createChatBotMessage(
      `سلام! به چت‌بات پشتیبانی خوش آمدید. لطفا نام خود را وارد کنید.`
    ),
  ],
  botName: "پشتیبان گیمیفای‌شده",
  state: {
    conversationStage: "initial_greeting",
  },
  // ۲. یک پراپرتی جدید برای معرفی کامپوننت‌های سفارشی اضافه می‌کنیم
  customComponents: {
    // به کتابخانه می‌گوییم که کامپوننت 'header' را با کامپوننت ما جایگزین کن
    header: (props) => <CustomHeader {...props} />,
  },
  widgets: [
    {
      widgetName: "badgeNotification",
      widgetFunc: (props) => <BadgeNotification {...props} />,
    },
  ],
};

export default config;

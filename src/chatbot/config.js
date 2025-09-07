// src/chatbot/config.js
import { createChatBotMessage } from "react-chatbot-kit";
import ScoreDisplay from "../gamification-module/components/ScoreDisplay";
import BadgeNotification from "../gamification-module/components/BadgeNotification";

const config = {
  initialMessages: [
    createChatBotMessage(
      `سلام! به چت‌بات پشتیبانی خوش آمدید. لطفا نام خود را وارد کنید.`
    ),
  ],

  // یک وضعیت برای مدیریت مراحل گفتگو اضافه می‌کنیم
  state: {
    conversationStage: "initial_greeting",
  },

  // ویجت‌های سفارشی خود را به چت‌بات معرفی می‌کنیم
  widgets: [
    {
      widgetName: "scoreDisplay",
      widgetFunc: (props) => <ScoreDisplay {...props} />,
    },
    {
      widgetName: "badgeNotification",
      widgetFunc: (props) => <BadgeNotification {...props} />,
    },
  ],
};

export default config;

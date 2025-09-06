// src/chatbot-host-example/ChatbotComponent.js
import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import GamificationFeedback from "../gamification-module/components/GamificationFeedback";
import ScoreDisplay from "../gamification-module/components/ScoreDisplay";
// ۱. API ماژول گیمیفیکیشن را وارد می‌کنیم
import { gamificationAPI } from "../gamification-module";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#6e48aa",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#6e48aa",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ChatbotComponent = () => {
  // ۲. این تابع جدید را برای مدیریت رویدادها اضافه می‌کنیم
  const handleEnd = ({ steps }) => {
    // به مقدار آخرین مرحله ورودی کاربر با آیدی 'user_input' دسترسی پیدا می‌کنیم
    const userInput = steps.user_input.value;
    // رویداد را به موتور گیمیفیکیشن ارسال می‌کنیم
    gamificationAPI.triggerEvent("ASKED_QUESTION", { questionText: userInput });
  };

  const steps = [
    {
      id: "1",
      message:
        "سلام! به چت‌بات پشتیبانی خوش آمدید. برای شروع، نام خود را وارد کنید.",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message:
        "سلام {previousValue}، خوشبختم! ما برای تعاملات شما امتیاز در نظر می‌گیریم.",
      trigger: "feedback_step", // به مرحله بازخورد می‌رویم
    },
    {
      id: "feedback_step",
      // اینجا از کامپوننت هوشمند جدیدمان استفاده می‌کنیم
      component: <GamificationFeedback />,
      asMessage: true,
      waitAction: true, // منتظر می‌ماند تا triggerNextStep فراخوانی شود
      trigger: "ask_question",
    },
    {
      id: "ask_question",
      message: "هر سوالی دارید بپرسید.",
      trigger: "user_input",
    },
    {
      id: "user_input",
      user: true,
      trigger: ({ value }) => {
        gamificationAPI.triggerEvent("ASKED_QUESTION", { questionText: value });
        return "feedback_step"; // دوباره به مرحله بازخورد برمی‌گردیم
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} floating={true} />
    </ThemeProvider>
  );
};

export default ChatbotComponent;

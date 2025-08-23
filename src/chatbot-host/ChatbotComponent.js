// src/chatbot-host-example/ChatbotComponent.js
import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// کامپوننت سفارشی خودمان را وارد می‌کنیم
import ScoreDisplay from "../gamification-module/components/ScoreDisplay";

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
      trigger: "show-score",
    },
    {
      id: "show-score",
      // اینجا جادو اتفاق می‌افتد!
      // به جای message از component استفاده می‌کنیم
      component: <ScoreDisplay />,
      asMessage: true, // باعث می‌شود مانند یک پیام در چت نمایش داده شود
      trigger: "4",
    },
    {
      id: "4",
      message: "هر سوالی دارید بپرسید.",
      trigger: "5",
    },
    {
      id: "5",
      user: true,
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} floating={true} />
    </ThemeProvider>
  );
};

export default ChatbotComponent;

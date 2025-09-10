// src/chatbot/components/BadgeNotification.js
import React from "react";
import styled from "styled-components";

// ... (بخش keyframes و styled-components بدون تغییر باقی می‌ماند)
const BadgeWrapper = styled.div`
  background-color: #ffd700;
  color: #333;
  font-family: "MyPersianFont", sans-serif;
  padding: 12px;
  border-radius: 8px;
  margin: 5px;
  animation: fadeIn 0.5s ease-out;
  font-family: Arial, sans-serif;
  width: 220px;
`;
const BadgeTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 16px;
  font-family: "MyPersianFont", sans-serif;
`;
const BadgeDescription = styled.p`
  margin: 0;
  font-size: 13px;
  font-family: "MyPersianFont", sans-serif;
`;

const BADGE_DEFINITIONS = {
  FIRST_INTERACTION: {
    title: "🏆 اولین قدم!",
    description: "شما اولین تعامل خود را با موفقیت انجام دادید.",
  },
  INSIGHTFUL_QUESTION: {
    title: "🏆 کاوشگر کنجکاو!",
    description: "شما یک سوال عالی پرسیدید و به دنبال دانش هستید.",
  },
  KNOWLEDGE_SEEKER: {
    title: "🎓 دانشجو!",
    description: "شما به دنبال مطالعه راهنما و یادگیری بیشتر هستید. آفرین!",
  },
    CODE_SHARER: {
    title: "💻 کدنویس!",
    description: "شما برای حل مشکل، یک قطعه کد به اشتراک گذاشتید.",
  },
  CURIOUS_STREAK: {
    title: "🔥 کنجکاو پیگیر!",
    description: "شما ۳ سوال پشت سر هم پرسیدید و عطش یادگیری دارید.",
  },
};

// این کامپوننت حالا کاملا ساده است و اطلاعات را از props می‌خواند
const BadgeNotification = (props) => {
  const { badgeId } = props.payload;
  const badge = BADGE_DEFINITIONS[badgeId];

  if (!badge) return null;

  return (
    <BadgeWrapper>
      <BadgeTitle>{badge.title}</BadgeTitle>
      <BadgeDescription>{badge.description}</BadgeDescription>
    </BadgeWrapper>
  );
};

export default BadgeNotification;

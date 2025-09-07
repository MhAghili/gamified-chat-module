// src/chatbot/components/BadgeNotification.js
import React from "react";
import styled, { keyframes } from "styled-components";
// API ماژول گیمیفیکیشن را وارد می‌کنیم
import { gamificationAPI } from "../../gamification-module";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BadgeWrapper = styled.div`
  background-color: #ffd700; /* Gold */
  color: #333;
  padding: 12px;
  border-radius: 8px;
  margin: 5px;
  animation: ${fadeIn} 0.5s ease-out;
  font-family: Arial, sans-serif;
  width: 200px; /* یک عرض ثابت برای ظاهر بهتر */
`;

const BadgeTitle = styled.h4`
  margin: 0 0 5px 0;
  font-size: 16px;
`;

const BadgeDescription = styled.p`
  margin: 0;
  font-size: 13px;
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
};

const BadgeNotification = () => {
  // این کامپوننت حالا خودش مستقیماً به store گوش می‌دهد
  const badgeId = gamificationAPI.useStore((state) => state.newlyAwardedBadge);

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

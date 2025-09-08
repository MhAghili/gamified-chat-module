// src/chatbot/components/CustomHeader.js
import React from "react";
import styled from "styled-components";
import { gamificationAPI } from "../../gamification-module";

const HeaderWrapper = styled.div`
  background-color: #6e48aa;
  color: white;
  padding: 12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const ScoreContainer = styled.div`
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
`;

const CustomHeader = () => {
  // به صورت زنده به امتیاز کاربر گوش می‌دهیم
  const points = gamificationAPI.useStore((state) => state.points);

  return (
    <HeaderWrapper>
      <HeaderTitle>پشتیبان گیمیفای‌شده</HeaderTitle>
      <ScoreContainer>✨ امتیاز: {points}</ScoreContainer>
    </HeaderWrapper>
  );
};

export default CustomHeader;

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
  font-family: "MyPersianFont", Arial, sans-serif;
`;

const ScoreContainer = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-family: "MyPersianFont", sans-serif;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
`;

const ResetButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  font-family: "MyPersianFont", Arial, sans-serif;
  border-radius: 5px;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
`;

const CustomHeader = () => {
  const points = gamificationAPI.useStore((state) => state.points);

  const handleReset = () => {
    localStorage.removeItem("gamification-storage");
    localStorage.removeItem("chatbot_user_id");
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      {" "}
      <HeaderControls>
        <ScoreContainer>✨ امتیاز: {points}</ScoreContainer>
        <ResetButton onClick={handleReset}>ریست</ResetButton>
      </HeaderControls>
    </HeaderWrapper>
  );
};

export default CustomHeader;

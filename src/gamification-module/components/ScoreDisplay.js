// src/gamification-module/components/ScoreDisplay.js
import React from "react";
import { gamificationAPI } from "../index";
import styled from "styled-components";

const ScoreWrapper = styled.div`
  padding: 8px;
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 5px;
`;

const ScoreDisplay = () => {
  const points = gamificationAPI.useStore((state) => state.points);

  return (
    <ScoreWrapper>
      ✨ <strong>امتیاز شما:</strong> {points}
    </ScoreWrapper>
  );
};

export default ScoreDisplay;

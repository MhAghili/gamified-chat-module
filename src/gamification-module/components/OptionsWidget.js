// src/chatbot/components/OptionsWidget.js
import React from "react";
import styled from "styled-components";

const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const OptionButton = styled.button`
  background-color: #6e48aa;
  color: white;
  border: 1px solid white;
  padding: 8px 12px;
  border-radius: 20px;
  margin: 5px;
  font-family: "MyPersianFont", Arial, sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #815ac0;
  }
`;

const OptionsWidget = (props) => {
  const options = [
    {
      text: "🏆 دستاوردهای من",
      handler: props.actionProvider.handleShowBadges, 
      id: 1,
    },
  ];

  return (
    <OptionsWrapper>
      {options.map((option) => (
        <OptionButton key={option.id} onClick={option.handler}>
          {option.text}
        </OptionButton>
      ))}
    </OptionsWrapper>
  );
};

export default OptionsWidget;

import React from "react";
import styled from "styled-components";

const GameWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const ChoiceButton = styled.button`
  background-color: #f0f0f0;
  border: 2px solid #6e48aa;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 0 10px;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const RockPaperScissors = (props) => {
  const handleChoice = (choice) => {
    props.actionProvider.handleRpsChoice(choice);
  };

  return (
    <GameWrapper>
      <ChoiceButton onClick={() => handleChoice("rock")}>✊</ChoiceButton>
      <ChoiceButton onClick={() => handleChoice("paper")}>🖐️</ChoiceButton>
      <ChoiceButton onClick={() => handleChoice("scissors")}>✌️</ChoiceButton>
    </GameWrapper>
  );
};

export default RockPaperScissors;

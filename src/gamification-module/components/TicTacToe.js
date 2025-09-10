// src/chatbot/components/TicTacToe.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// --- Styled Components for the Game Board ---
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 180px;
  height: 180px;
  margin: 10px auto;
`;

const Cell = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid #6e48aa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  cursor: pointer;
  background-color: #f0f0f0;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TicTacToe = (props) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Check for winner on every board change
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      props.actionProvider.handleGameResult({ winner });
    } else if (!board.includes(null)) {
      // It's a draw
      props.actionProvider.handleGameResult({ winner: "Draw" });
    } else if (!isPlayerTurn) {
      // Bot's turn
      setTimeout(botMove, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, isPlayerTurn]);

  const playerMove = (index) => {
    if (!board[index] && isPlayerTurn) {
      const newBoard = [...board];
      newBoard[index] = "X";
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  const botMove = () => {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    if (emptyCells.length > 0) {
      const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = "O";
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  return (
    <Board>
      {board.map((cell, index) => (
        <Cell key={index} onClick={() => playerMove(index)}>
          {cell}
        </Cell>
      ))}
    </Board>
  );
};

// Helper function to determine the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;

// src/chatbot/components/TicTacToe.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";


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

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      props.actionProvider.handleGameResult({ winner });
    } else if (!board.includes(null)) {
      props.actionProvider.handleGameResult({ winner: "Draw" });
    } else if (!isPlayerTurn) {
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

  // --- Complete rewrite of the botMove function with new logic ---
  const botMove = () => {
    let bestMove = -1;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // 1. First priority: Find a winning move for the bot ('O')
    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] === "O" && board[a] === board[b] && board[c] === null)
        bestMove = c;
      if (board[a] === "O" && board[a] === board[c] && board[b] === null)
        bestMove = b;
      if (board[b] === "O" && board[b] === board[c] && board[a] === null)
        bestMove = a;
      if (bestMove !== -1) break;
    }

    // 2. Second priority: Block the player's ('X') winning move
    if (bestMove === -1) {
      for (const line of lines) {
        const [a, b, c] = line;
        if (board[a] === "X" && board[a] === board[b] && board[c] === null)
          bestMove = c;
        if (board[a] === "X" && board[a] === board[c] && board[b] === null)
          bestMove = b;
        if (board[b] === "X" && board[b] === board[c] && board[a] === null)
          bestMove = a;
        if (bestMove !== -1) break;
      }
    }

    // If no strategic move was found, proceed to the next priorities
    if (bestMove === -1) {
      const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((val) => val !== null);

      // 3. Third priority: Take the center
      if (emptyCells.includes(4)) {
        bestMove = 4;
      } else {
        // 4. Fourth priority: Take a corner
        const corners = [0, 2, 6, 8].filter((index) =>
          emptyCells.includes(index)
        );
        if (corners.length > 0) {
          bestMove = corners[Math.floor(Math.random() * corners.length)];
        } else {
          // 5. Fifth priority: Take a side
          const sides = [1, 3, 5, 7].filter((index) =>
            emptyCells.includes(index)
          );
          if (sides.length > 0) {
            bestMove = sides[Math.floor(Math.random() * sides.length)];
          }
        }
      }
    }

    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = "O";
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

// src/chatbot/components/Hangman.js
import styled from "styled-components";
import { gamificationAPI } from "../../gamification-module";

// --- Styled Components ---
const GameContainer = styled.div`
  padding: 15px;
  font-family: "MyPersianFont", Arial, sans-serif;
  width: 280px;
  text-align: center;
`;

const WordDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 15px;
  direction: ltr;
`;

const Keyboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  padding-right: 25px;
`;

const Key = styled.button`
  width: 30px;
  height: 30px;
  font-family: "MyPersianFont", Arial, sans-serif;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:disabled {
    cursor: not-allowed;
    background-color: #ddd;
    color: #888;
  }
`;

const HangmanStatus = styled.p`
  font-weight: bold;
  color: #d9534f;
`;

const Letter = styled.span`
  width: 30px;
  height: 35px;
  border-bottom: 3px solid #6e48aa;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

const alphabet = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی".split("");

const Hangman = (props) => {
  const { secretWord, guessedLetters, errorCount } = gamificationAPI.useStore(
    (state) => state.hangmanGame
  );

  const handleGuess = (letter) => {
    props.actionProvider.handleHangmanGuess(letter);
  };

  const displayWord = secretWord
    .split("")
    .map((char, index) => (guessedLetters.includes(char) ? char : "_"))
    .join(" ");

  return (
    <GameContainer>
      <HangmanStatus>خطاهای شما: {errorCount} / 8</HangmanStatus>
      <WordDisplay>
        {secretWord
          .split("")
          .reverse()
          .map((char, index) => (
            <Letter key={index}>
              {guessedLetters.includes(char) ? char : "_"}
            </Letter>
          ))}
      </WordDisplay>

      <Keyboard>
        {alphabet.map((letter) => (
          <Key
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter)}
          >
            {letter}
          </Key>
        ))}
      </Keyboard>
    </GameContainer>
  );
};

export default Hangman;

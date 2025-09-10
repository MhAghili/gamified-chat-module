// src/chatbot/ActionProvider.js
import { gamificationAPI } from "../gamification-module";
import { gameQuestions } from "./gameQuestions";

export const actionProviderRef = { current: null };

const MAX_GAME_QUESTIONS = 5;
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;

    actionProviderRef.current = this;
  }

  handleNameInput = async (name) => {
    gamificationAPI.useStore.getState().setUserName(name);
    gamificationAPI.triggerEvent("USER_INTERACTED");
    const thinkingMessage = this.createChatBotMessage(
      "چند لحظه صبر کن تا خودم رو معرفی کنم..."
    );
    this.addMessageToState(thinkingMessage);

    try {
      const response = await fetch(
        "http://localhost:3001/api/getWelcomeMessage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: name }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const aiWelcomeMessage = this.createChatBotMessage(data.welcomeMessage);
      this.addMessageToState(aiWelcomeMessage);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        `خوش آمدی ${name}! هر سوالی داری از من بپرس.`
      );
      this.addMessageToState(errorMessage);
    }

    this.setConversationStage("asking_questions");
    this.sendGamificationFeedback();
  };

  handleUserQuestion = async (message) => {
    const thinkingMessage = this.createChatBotMessage("در حال فکر کردن...");
    this.addMessageToState(thinkingMessage);

    try {
      const { userId } = gamificationAPI.useStore.getState();
      const response = await fetch("http://localhost:3001/api/askAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, question: message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const aiAnswer = this.createChatBotMessage(data.answer);
      this.addMessageToState(aiAnswer);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "متاسفانه در حال حاضر نمی‌توانم پاسخ دهم. لطفاً بعداً تلاش کنید."
      );
      this.addMessageToState(errorMessage);
    }

    gamificationAPI.triggerEvent("USER_ASKED_QUESTION", {
      questionText: message,
    });
    this.sendGamificationFeedback();
  };

  handleStartGame = () => {
    const gameChoice = Math.random() < 0.5 ? "quiz" : "rps";

    if (gameChoice === "quiz") {
      const { startGame } = gamificationAPI.useStore.getState();
      const randomIndex = Math.floor(Math.random() * gameQuestions.length);
      const { question, answer } = gameQuestions[randomIndex];
      startGame(question, answer.toLowerCase());
      const gameMessage = this.createChatBotMessage(
        `بسیار خب، بازی کوییز! سوال اینه: ${question}`
      );
      this.addMessageToState(gameMessage);
    } else {
      const gameMessage = this.createChatBotMessage(
        "بازی سنگ، کاغذ، قیچی! انتخابت رو بکن:",
        {
          widget: "rockPaperScissors",
        }
      );
      this.addMessageToState(gameMessage);
    }
  };

  handleRpsChoice = (userChoice) => {
    const choices = ["rock", "paper", "scissors"];
    const choiceMap = { rock: "سنگ ✊", paper: "کاغذ 🖐️", scissors: "قیچی ✌️" };
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const { addPoints } = gamificationAPI.useStore.getState();
    let resultMessage = "";
    let pointsAwarded = 0;
    debugger;
    if (userChoice === botChoice) {
      resultMessage = `مساوی شد! هر دو ${choiceMap[userChoice]} رو انتخاب کردیم.`;
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "scissors" && botChoice === "paper") ||
      (userChoice === "paper" && botChoice === "rock")
    ) {
      pointsAwarded = 25;
      resultMessage = `تو بردی! من ${choiceMap[botChoice]} و تو ${choiceMap[userChoice]} رو انتخاب کردی. ${pointsAwarded} امتیاز گرفتی!`;
      addPoints(pointsAwarded);
    } else {
      resultMessage = `من بردم! من ${choiceMap[botChoice]} و تو ${choiceMap[userChoice]} رو انتخاب کردی. امتیازی نگرفتی.`;
    }

    const finalMessage = this.createChatBotMessage(resultMessage);
    this.addMessageToState(finalMessage);

    const continueMessage = this.createChatBotMessage(
      "اگر سوالی داری بپرس یا دوباره بازی کنیم!"
    );
    setTimeout(() => this.addMessageToState(continueMessage), 1500);
  };

  handleGameAnswer = (userAnswer) => {
    const { game, endGame, addPoints, incrementQuestionsAsked } =
      gamificationAPI.useStore.getState();

    if (userAnswer.includes(game.answer)) {
      const pointsToAward = 50;
      const winMessage = this.createChatBotMessage(
        `آفرین درست گفتی! ${pointsToAward} امتیاز گرفتی.`
      );
      this.addMessageToState(winMessage);
      addPoints(pointsToAward);
    } else {
      const loseMessage = this.createChatBotMessage(
        `اشتباه بود! جواب صحیح '${game.answer}' بود.`
      );
      this.addMessageToState(loseMessage);
    }

    incrementQuestionsAsked();


    var { questionsAsked } = gamificationAPI.useStore.getState().game;
    if (questionsAsked < MAX_GAME_QUESTIONS) {
      setTimeout(() => this.askNewGameQuestion(), 1500);
    } else {
      const endMessage = this.createChatBotMessage(
        "بازی تموم شد! برای ۵ سوال عالی بود. امیدوارم لذت برده باشی."
      );
      setTimeout(() => this.addMessageToState(endMessage), 1500);
      endGame();
    }
  };

  askNewGameQuestion = () => {
    const { startGame } = gamificationAPI.useStore.getState();
    const randomIndex = Math.floor(Math.random() * gameQuestions.length);
    const { question, answer } = gameQuestions[randomIndex];

    startGame(question, answer.toLowerCase());

    const gameMessage = this.createChatBotMessage(`سوال جدید: ${question}`);
    this.addMessageToState(gameMessage);
  };

  handleEndGameCommand = () => {
    const { endGame } = gamificationAPI.useStore.getState();
    endGame(); 

    const endMessage = this.createChatBotMessage(
      "باشه، بازی تموم شد. حالا می‌تونیم به گفتگوی فنی ادامه بدیم."
    );
    this.addMessageToState(endMessage);
  };

  sendGamificationFeedback = () => {
    const { newlyAwardedBadge, clearNewBadge } =
      gamificationAPI.useStore.getState();

    if (newlyAwardedBadge) {
      const badgeMessage = this.createChatBotMessage(
        "یک دستاورد جدید کسب کردی!",
        {
          widget: "badgeNotification",
          payload: { badgeId: newlyAwardedBadge },
        }
      );
      this.addMessageToState(badgeMessage);


      setTimeout(() => {
        clearNewBadge();
      }, 4000);
    } else {
    }
  };

  handleShowBadges = () => {
    const badgesMessage = this.createChatBotMessage(
      "این‌ها دستاوردهایی هست که تا الان کسب کردی:",
      {
        widget: "badgeList",
      }
    );
    this.addMessageToState(badgesMessage);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  setConversationStage = (stage) => {
    this.setState((prev) => ({
      ...prev,
      conversationStage: stage,
    }));
  };
}

export default ActionProvider;

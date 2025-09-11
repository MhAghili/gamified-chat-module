// src/chatbot/ActionProvider.js
import { gamificationAPI } from "../gamification-module";
import { gameQuestions } from "./gameQuestions";

export const actionProviderRef = { current: null };

const rewards = [
  { id: "microservices", name: "توضیح معماری میکروسرویس", cost: 150 },
  { id: "sql_vs_nosql", name: "مقایسه SQL و NoSQL", cost: 200 },
  { id: "dijkstra", name: "آموزش الگوریتم Dijkstra", cost: 250 },
];

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
        "https://gamified-chat-module-production.up.railway.app/api/getWelcomeMessage",
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
      const response = await fetch("https://gamified-chat-module-production.up.railway.app/api/askAI", {
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
    const games = ["quiz", "rps", "tictactoe"];
    const gameChoice = games[Math.floor(Math.random() * games.length)];

    if (gameChoice === "quiz") {
      const { startGame } = gamificationAPI.useStore.getState();
      const randomIndex = Math.floor(Math.random() * gameQuestions.length);
      const { question, answer } = gameQuestions[randomIndex];
      startGame(question, answer.toLowerCase());
      const gameMessage = this.createChatBotMessage(
        `بسیار خب، بازی کوییز! سوال اینه: ${question}`
      );
      this.addMessageToState(gameMessage);
    } else if (gameChoice === "rps") {
      const gameMessage = this.createChatBotMessage(
        "بازی سنگ، کاغذ، قیچی! انتخابت رو بکن:",
        {
          widget: "rockPaperScissors",
        }
      );
      this.addMessageToState(gameMessage);
    } else {
      // بازی دوز
      const gameMessage = this.createChatBotMessage(
        "بازی دوز! شما X هستید. اولین حرکت با شماست.",
        {
          widget: "ticTacToe",
        }
      );
      this.addMessageToState(gameMessage);
    }
  };

  handleGameResult = (result) => {
    const { addPoints } = gamificationAPI.useStore.getState();
    let resultMessage = "";

    if (result.winner === "X") {
      resultMessage = "عالیه، تو بردی! 75 امتیاز ویژه گرفتی.";
      addPoints(75);
    } else if (result.winner === "O") {
      resultMessage = "من بردم! بیشتر تلاش کن.";
    } else {
      resultMessage = "مساوی شدیم! بازی خوبی بود.";
    }

    const finalMessage = this.createChatBotMessage(resultMessage);
    this.addMessageToState(finalMessage);

    const continueMessage = this.createChatBotMessage(
      "اگر سوالی داری بپرس یا دوباره بازی کنیم!"
    );
    setTimeout(() => this.addMessageToState(continueMessage), 1500);
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

  handleShowShop = () => {
    const { points, unlockedContent } = gamificationAPI.useStore.getState();
    debugger;
    const rewardOptions = rewards.map((reward) => ({
      text: `${reward.name} (${reward.cost} امتیاز) ${
        unlockedContent.includes(reward.id) ? "✓" : ""
      }`,
      handler: () => this.handlePurchase(reward.id),
      disabled: unlockedContent.includes(reward.id) || points < reward.cost,
      id: reward.id,
    }));

    const shopMessage = this.createChatBotMessage(
      `به فروشگاه محتوای ویژه خوش آمدی! امتیاز فعلی شما: ${points}`,
      {
        widget: "optionsWidget",
        payload: { options: rewardOptions },
      }
    );
    this.addMessageToState(shopMessage);
  };

  handlePurchase = async (rewardId) => {
    const reward = rewards.find((r) => r.id === rewardId);
    const { points, spendPoints, addUnlockedContent } =
      gamificationAPI.useStore.getState();

    if (points >= reward.cost) {
      spendPoints(reward.cost);
      addUnlockedContent(reward.id);

      const thinkingMessage = this.createChatBotMessage(
        "عالیه! در حال آماده کردن محتوای ویژه برای شما..."
      );
      this.addMessageToState(thinkingMessage);

      try {
        const response = await fetch(
          "https://gamified-chat-module-production.up.railway.app/api/getSpecialContent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicId: rewardId }),
          }
        );
        const data = await response.json();
        const contentMessage = this.createChatBotMessage(data.content);
        this.addMessageToState(contentMessage);
      } catch (error) {
        this.addMessageToState(
          this.createChatBotMessage("متاسفانه مشکلی پیش آمد.")
        );
      }
    } else {
      // این حالت به دلیل disabled بودن دکمه نباید اتفاق بیفتد، اما برای اطمینان است
      const sorryMessage = this.createChatBotMessage(
        "متاسفانه امتیازت کافی نیست."
      );
      this.addMessageToState(sorryMessage);
    }
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

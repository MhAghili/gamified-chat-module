// src/chatbot/ActionProvider.js
import { gamificationAPI } from "../gamification-module";
import { gameQuestions } from "./gameQuestions";

const MAX_GAME_QUESTIONS = 5;
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleNameInput = async (name) => {
    gamificationAPI.useStore.getState().setUserName(name);
    gamificationAPI.triggerEvent("USER_INTERACTED");
    const thinkingMessage = this.createChatBotMessage(
      "چند لحظه صبر کن تا خودم رو معرفی کنم..."
    );
    this.addMessageToState(thinkingMessage);

    try {
      // ۳. درخواست را به endpoint جدید سرور ارسال می‌کنیم
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
      // در صورت بروز خطا، یک پیام پیش‌فرض نمایش می‌دهیم
      const errorMessage = this.createChatBotMessage(
        `خوش آمدی ${name}! هر سوالی داری از من بپرس.`
      );
      this.addMessageToState(errorMessage);
    }

    // ۴. مرحله گفتگو را تغییر داده و بازخورد گیمیفیکیشن (بج) را نمایش می‌دهیم
    this.setConversationStage("asking_questions");
    this.sendGamificationFeedback();
  };

  // این تابع اکنون هوشمند می‌شود
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

    // ۳. بعد از دریافت پاسخ، منطق گیمیفیکیشن را مثل قبل اجرا می‌کنیم
    gamificationAPI.triggerEvent("USER_ASKED_QUESTION", {
      questionText: message,
    });
    this.sendGamificationFeedback();
  };

  handleStartGame = () => {
    const startGameMessage = this.createChatBotMessage(
      "بازی شروع شد! حدس بزن اصطلاح فنی چیست."
    );
    this.addMessageToState(startGameMessage);
    this.askNewGameQuestion();
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

    // چک می‌کنیم آیا بازی باید ادامه پیدا کند

    var { questionsAsked } = gamificationAPI.useStore.getState().game;
    if (questionsAsked < MAX_GAME_QUESTIONS) {
      // اگر هنوز به حدنصاب نرسیده‌ایم، سوال بعدی را می‌پرسیم
      setTimeout(() => this.askNewGameQuestion(), 1500);
    } else {
      // اگر ۵ سوال پرسیده شد، بازی را تمام می‌کنیم
      const endMessage = this.createChatBotMessage(
        "بازی تموم شد! برای ۵ سوال عالی بود. امیدوارم لذت برده باشی."
      );
      setTimeout(() => this.addMessageToState(endMessage), 1500);
      endGame();
    }
  };

  // این تابع جدید و کلیدی را اضافه کن
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
    endGame(); // وضعیت بازی را در store ریست می‌کنیم

    const endMessage = this.createChatBotMessage(
      "باشه، بازی تموم شد. حالا می‌تونیم به گفتگوی فنی ادامه بدیم."
    );
    this.addMessageToState(endMessage);
  };

  sendGamificationFeedback = () => {
    const { newlyAwardedBadge, clearNewBadge } =
      gamificationAPI.useStore.getState();

    if (newlyAwardedBadge) {
      // اگر بج جدیدی کسب شده بود، ویجت بج را با payload ارسال می‌کنیم
      const badgeMessage = this.createChatBotMessage(
        "یک دستاورد جدید کسب کردی!",
        {
          widget: "badgeNotification",
          // ما اطلاعات بج را مستقیماً به پیام پاس می‌دهیم
          payload: { badgeId: newlyAwardedBadge },
        }
      );
      this.addMessageToState(badgeMessage);

      // تمام منطق پاک کردن بج به اینجا منتقل می‌شود
      // بعد از ۴ ثانیه، بج را از state پاک می‌کنیم
      setTimeout(() => {
        clearNewBadge();
      }, 4000);
    } else {
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

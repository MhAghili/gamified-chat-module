// src/chatbot/ActionProvider.js
import { gamificationAPI } from "../gamification-module";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // اکشن برای مدیریت نام کاربر در ابتدای گفتگو
  handleNameInput = (name) => {
    gamificationAPI.triggerEvent("USER_INTERACTED");

    const welcomeMessage = this.createChatBotMessage(
      `خوش آمدی ${name}! از الان امتیازات شما محاسبه می‌شه. هر سوالی داری بپرس.`
    );
    this.addMessageToState(welcomeMessage);
    this.setConversationStage("asking_questions");

    // پس از هر اکشن، این تابع را برای نمایش بازخورد فراخوانی می‌کنیم
    this.sendGamificationFeedback();
  };

  // اکشن برای مدیریت سوالات کاربر
  handleUserQuestion = (message) => {
    gamificationAPI.triggerEvent("USER_ASKED_QUESTION", {
      questionText: message,
    });
    this.sendGamificationFeedback();
  };

  // تابع اصلی و یکپارچه برای ارسال بازخورد
  sendGamificationFeedback = () => {
    const { newlyAwardedBadge, clearNewBadge, points } =
      gamificationAPI.useStore.getState();

    if (newlyAwardedBadge) {
      // اگر بج جدیدی کسب شده بود، ویجت بج را نمایش بده
      const badgeMessage = this.createChatBotMessage(
        "یک دستاورد جدید کسب کردی!",
        {
          widget: "badgeNotification",
        }
      );
      this.addMessageToState(badgeMessage);
      clearNewBadge(); // فراموش نکنیم که اعلان را پاک کنیم
    } else {
      // در غیر این صورت، فقط امتیاز فعلی را نمایش بده
      const scoreMessage = this.createChatBotMessage(
        `امتیاز فعلی شما: ${points}`
      );
      this.addMessageToState(scoreMessage);
    }
  };

  // --- توابع کمکی ---
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

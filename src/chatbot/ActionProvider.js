// src/chatbot/ActionProvider.js
import { gamificationAPI } from "../gamification-module";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleNameInput = (name) => {
    gamificationAPI.triggerEvent("USER_INTERACTED");
    const welcomeMessage = this.createChatBotMessage(
      `خوش آمدی ${name}! از الان امتیازات شما محاسبه می‌شه.`
    );
    this.addMessageToState(welcomeMessage);
    this.setConversationStage("asking_questions");
    this.sendGamificationFeedback();
  };

  handleUserQuestion = (message) => {
    gamificationAPI.triggerEvent("USER_ASKED_QUESTION", {
      questionText: message,
    });
    this.sendGamificationFeedback();
  };

  sendGamificationFeedback = () => {
    const { newlyAwardedBadge, clearNewBadge, points } =
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
      const scoreMessage = this.createChatBotMessage(
        `امتیاز فعلی شما: ${points}`
      );
      this.addMessageToState(scoreMessage);
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

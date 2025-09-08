// src/chatbot/ActionProvider.js
import { gamificationAPI } from "../gamification-module";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleNameInput = (name) => {
    gamificationAPI.useStore.getState().setUserName(name);
    gamificationAPI.triggerEvent("USER_INTERACTED");
    const welcomeMessage = this.createChatBotMessage(
      `خوش آمدی ${name}! از الان امتیازات شما محاسبه می‌شه. هر سوالی داری بپرس.`
    );
    this.addMessageToState(welcomeMessage);
    this.setConversationStage("asking_questions");
    this.sendGamificationFeedback();
  };

  // این تابع اکنون هوشمند می‌شود
  handleUserQuestion = async (message) => {
    const thinkingMessage = this.createChatBotMessage("در حال فکر کردن...");
    this.addMessageToState(thinkingMessage);

    try {
      const response = await fetch("http://localhost:5000/api/askAI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
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

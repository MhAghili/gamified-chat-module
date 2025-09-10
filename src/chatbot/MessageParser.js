// src/chatbot/MessageParser.js

// ۱. API ماژول گیمیفیکیشن را وارد می‌کنیم تا به حافظه آن دسترسی داشته باشیم
import { gamificationAPI } from "../gamification-module";

const GAME_TRIGGER_KEYWORDS = ["بازی", "سرگرمی", "کوییز", "چالش", "quiz"];
const GAME_END_KEYWORDS = ["اتمام", "پایان", "خروج", "کافیه", "بس"];

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    // ما همچنان state را برای استفاده‌های احتمالی آینده نگه می‌داریم
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    // ۲. مستقیماً از حافظه گیمیفیکیشن (Zustand) وضعیت بازی را می‌خوانیم
    const isGameActive = gamificationAPI.useStore.getState().game.isActive;

    if (isGameActive) {
      const wantsToEndGame = GAME_END_KEYWORDS.some((keyword) =>
        lowerCaseMessage.includes(keyword)
      );
      if (wantsToEndGame) {
        this.actionProvider.handleEndGameCommand();
      } else {
        this.actionProvider.handleGameAnswer(lowerCaseMessage);
      }
      return;
    }

    const wantsToPlayGame = GAME_TRIGGER_KEYWORDS.some((keyword) =>
      lowerCaseMessage.includes(keyword)
    );
    if (wantsToPlayGame) {
      this.actionProvider.handleStartGame();
      return;
    }

    if (this.state.conversationStage === "initial_greeting") {
      this.actionProvider.handleNameInput(lowerCaseMessage);
    } else {
      this.actionProvider.handleUserQuestion(lowerCaseMessage);
    }
  }
}

export default MessageParser;

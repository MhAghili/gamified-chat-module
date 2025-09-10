import { gamificationAPI } from "../gamification-module";

const GAME_TRIGGER_KEYWORDS = ["بازی", "سرگرمی", "کوییز", "چالش", "quiz"];
const GAME_END_KEYWORDS = [
  "اتمام",
  "پایان",
  "خروج",
  "کافیه",
  "بس",
  "تمام",
  "کافی",
];
const SHOP_KEYWORDS = ["جایزه", "جوایز", "فروشگاه", "خرید"];

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
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

    const wantsToShop = SHOP_KEYWORDS.some((keyword) =>
      lowerCaseMessage.includes(keyword)
    );
    if (wantsToShop) {
      this.actionProvider.handleShowShop();
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

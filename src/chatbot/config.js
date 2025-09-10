import { createChatBotMessage } from "react-chatbot-kit";
import BadgeNotification from "../gamification-module/components/BadgeNotification";
import CustomHeader from "../gamification-module/components/CustomHeader";
import BadgeList from "../gamification-module/components/BadgeList";
import OptionsWidget from "../gamification-module/components/OptionsWidget";
import RockPaperScissors from "../gamification-module/components/RockPaperScissors";
import TicTacToe from "../gamification-module/components/TicTacToe";

import { gamificationAPI } from "../gamification-module";

const createChatbotConfig = () => {
  const { userName } = gamificationAPI.useStore.getState();

  const initialMessages = userName
    ? [
        createChatBotMessage(`سلام خوش برگشتی ${userName}`, {
          widget: "optionsWidget",
        }),
        createChatBotMessage(
          `چه کاری می‌تونم برات انجام بدم؟` +
            "\n" +
            `هر سوالی داری برام تایپ کن`
        ),
      ]
    : [
        createChatBotMessage(
          `سلام! به چت‌بات پشتیبانی خوش آمدید. لطفا نام خود را وارد کنید.`
        ),
      ];

  const conversationStage = userName ? "asking_questions" : "initial_greeting";

  return {
    initialMessages,
    botName: "پشتیبان گیمیفای‌شده",
    state: {
      conversationStage,
    },
    customComponents: {
      header: (props) => <CustomHeader {...props} />,
    },
    widgets: [
      {
        widgetName: "badgeNotification",
        widgetFunc: (props) => <BadgeNotification {...props} />,
      },
      {
        widgetName: "badgeList",
        widgetFunc: (props) => <BadgeList {...props} />,
      },
      {
        widgetName: "optionsWidget",
        widgetFunc: (props) => <OptionsWidget {...props} />,
      },
      {
        widgetName: "rockPaperScissors",
        widgetFunc: (props) => <RockPaperScissors {...props} />,
      },
      {
        widgetName: "ticTacToe",
        widgetFunc: (props) => <TicTacToe {...props} />,
      },
    ],
  };
};

export default createChatbotConfig;

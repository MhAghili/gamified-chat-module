import { useGameStore } from "./store/gameStore";
import { rules } from "./engine/rules";

export const gamificationAPI = {
  init: (userId) => {
    useGameStore.getState().initialize(userId);
    console.log(`Gamification module initialized for user: ${userId}`);
  },

  triggerEvent: (eventName, payload) => {
    const { getState, setState } = useGameStore;
    debugger;

    if (rules[eventName]) {
      rules[eventName](getState, setState, payload);
    } else {
      console.warn(`No rule defined for event: ${eventName}`);
    }
  },

  useStore: useGameStore,
};

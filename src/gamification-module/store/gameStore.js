import { create } from "zustand";
import { persist } from "zustand/middleware";
const initialState = {
  isInitialized: false,
  userId: null,
  points: 0,
  badges: [],
  userName: null,
  newlyAwardedBadge: null,
  questionStreak: 0,
  lastQuestionTimestamp: null,
  game: {
    isActive: false,
    question: null,
    answer: null,
    questionsAsked: 0,
  },
  unlockedContent: [],
};

export const useGameStore = create(
  persist(
    (set) => ({
      ...initialState,

      // --- Actions ---
      setUserName: (name) => set({ userName: name }),
      addPoints: (amount) =>
        set((state) => ({ points: state.points + amount })),

      addBadge: (badgeId) =>
        set((state) => {
          if (!state.badges.includes(badgeId)) {
            return {
              badges: [...state.badges, badgeId],
              newlyAwardedBadge: badgeId,
            };
          }
          return { ...state, newlyAwardedBadge: null };
        }),

      clearNewBadge: () => set({ newlyAwardedBadge: null }),

      incrementStreak: () =>
        set((state) => ({
          questionStreak: state.questionStreak + 1,
          lastQuestionTimestamp: Date.now(),
        })),

      startGame: (question, answer) =>
        set((state) => ({
          game: {
            ...state.game,
            isActive: true,
            question,
            answer,
          },
        })),
      incrementQuestionsAsked: () =>
        set((state) => ({
          game: {
            ...state.game,
            questionsAsked: state.game.questionsAsked + 1,
          },
        })),

      endGame: () =>
        set((state) => ({
          game: { ...state.game, isActive: false, questionsAsked: 0 },
        })),

      spendPoints: (amount) =>
        set((state) => ({ points: state.points - amount })),

      addUnlockedContent: (contentId) =>
        set((state) => ({
          unlockedContent: [...state.unlockedContent, contentId],
        })),

      resetStreak: () =>
        set({ questionStreak: 1, lastQuestionTimestamp: Date.now() }),

      initialize: (userId) =>
        set({
          isInitialized: true,
          userId: userId,
        }),

      reset: () => set((state) => ({ ...initialState, userId: state.userId })),
    }),
    {
      name: "gamification-storage", // localStorage
      partialize: (state) => ({
        points: state.points,
        badges: state.badges,
        userName: state.userName,
        questionStreak: state.questionStreak,
        lastQuestionTimestamp: state.lastQuestionTimestamp,
        unlockedContent: state.unlockedContent,
      }),
    }
  )
);

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
    answers: [],
    difficulty: null,
    questionsAsked: 0,
  },
  unlockedContent: [],
  unlockedThemes: ["default"],
  activeTheme: "default",
  hangmanGame: {
    isActive: false,
    secretWord: "",
    guessedLetters: [],
    errorCount: 0,
  },
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

      startGame: (question, answers, difficulty) =>
        set((state) => ({
          game: {
            ...state.game,
            isActive: true,
            question,
            answers,
            difficulty,
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

      startHangman: (word) =>
        set(() => {
          const secretWord = word.toLowerCase();
          const randomIndex = Math.floor(Math.random() * secretWord.length);
          const hintLetter = secretWord[randomIndex];

          return {
            hangmanGame: {
              isActive: true,
              secretWord: secretWord,
              guessedLetters: [hintLetter],
              errorCount: 0,
            },
          };
        }),

      guessLetter: (letter) =>
        set((state) => {
          const { secretWord, guessedLetters, errorCount } = state.hangmanGame;
          const newGuessedLetters = [...guessedLetters, letter];
          let newErrorCount = errorCount;

          if (!secretWord.includes(letter)) {
            newErrorCount++;
          }

          return {
            hangmanGame: {
              ...state.hangmanGame,
              guessedLetters: newGuessedLetters,
              errorCount: newErrorCount,
            },
          };
        }),

      endHangman: () =>
        set((state) => ({
          hangmanGame: { ...state.hangmanGame, isActive: false },
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

      unlockTheme: (themeId) =>
        set((state) => ({
          unlockedThemes: [...state.unlockedThemes, themeId],
        })),

      setActiveTheme: (themeId) => set({ activeTheme: themeId }),
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
        unlockedThemes: state.unlockedThemes,
        activeTheme: state.activeTheme,
      }),
    }
  )
);

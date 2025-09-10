import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  isInitialized: false,
  userId: null,
  points: 0,
  badges: [],
  userName: null, // ۱. نام کاربر را به state اضافه کردیم
  newlyAwardedBadge: null, // این وضعیت نباید ذخیره شود
  questionStreak: 0,
  lastQuestionTimestamp: null, // <-- این خط را اضافه کن
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
          lastQuestionTimestamp: Date.now(), // <-- زمان را هم ثبت می‌کنیم
        })),
      resetStreak: () =>
        set({ questionStreak: 1, lastQuestionTimestamp: Date.now() }), // <-- ریست به ۱

      initialize: (userId) =>
        set({
          isInitialized: true,
          userId: userId,
        }),

      reset: () => set((state) => ({ ...initialState, userId: state.userId })),
    }),
    {
      name: "gamification-storage", // نام کلید در localStorage
      // ما فقط می‌خواهیم امتیاز و نشان‌ها ذخیره شوند
      partialize: (state) => ({
        points: state.points,
        badges: state.badges,
        userName: state.userName,
        questionStreak: state.questionStreak,
        lastQuestionTimestamp: state.lastQuestionTimestamp,
      }),
    }
  )
);

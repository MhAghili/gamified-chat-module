import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  isInitialized: false,
  userId: null,
  points: 0,
  badges: [],
  newlyAwardedBadge: null, // این وضعیت نباید ذخیره شود
};

export const useGameStore = create(
  persist(
    (set) => ({
      ...initialState,

      // --- Actions ---
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
      }),
    }
  )
);

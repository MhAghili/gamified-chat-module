import { create } from "zustand";

// تعریف وضعیت اولیه برای کاربر
const initialState = {
  isInitialized: false,
  userId: null,
  points: 0,
  badges: [], // آرایه‌ای از شناسه‌های نشان‌های کسب‌شده
};

export const useGameStore = create((set) => ({
  ...initialState,
  newlyAwardedBadge: null,

  // --- Actions ---

  // اکشن برای تنظیم وضعیت اولیه
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),

  addBadge: (badgeId) =>
    set((state) => {
      if (!state.badges.includes(badgeId)) {
        return {
          badges: [...state.badges, badgeId],
          newlyAwardedBadge: badgeId,
        };
      }
      return { ...state, newlyAwardedBadge: null }; // اگر نشان تکراری بود، اعلان نشان نده
    }),

  // اکشن برای پاک کردن اعلان پس از نمایش
  clearNewBadge: () => set({ newlyAwardedBadge: null }),

  // اکشن برای مقداردهی اولیه یا بارگذاری وضعیت کاربر
  initialize: (userId, savedState) =>
    set({
      isInitialized: true,
      userId: userId,
      points: savedState?.points || 0,
      badges: savedState?.badges || [],
    }),

  // اکشن برای ریست کردن وضعیت
  reset: () => set(initialState),
}));


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

  // --- Actions ---

    // اکشن برای تنظیم وضعیت اولیه
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),

  // اکشن برای اعطای یک نشان جدید
  addBadge: (badgeId) =>
    set((state) => {
      // فقط در صورتی نشان را اضافه کن که کاربر قبلاً آن را نداشته باشد
      if (!state.badges.includes(badgeId)) {
        return { badges: [...state.badges, badgeId] };
      }
      return state;
    }),

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

// src/gamification-module/index.js

import { useGameStore } from "./store/gameStore";
import { rules } from "./engine/rules";

// این آبجکت، API عمومی ماژول شماست
export const gamificationAPI = {
  /**
   * وضعیت ماژول گیمیفیکیشن را برای یک کاربر خاص مقداردهی اولیه می‌کند
   * @param {string} userId - شناسه منحصر به فرد کاربر
   */
  init: (userId) => {
    // در یک برنامه واقعی، اینجا وضعیت ذخیره‌شده کاربر را از یک سرور یا localStorage می‌خوانیم
    // فعلاً با وضعیت پیش‌فرض شروع می‌کنیم
    const savedState = {}; // TODO: Load from storage
    useGameStore.getState().initialize(userId, savedState);
    console.log(`Gamification module initialized for user: ${userId}`);
  },

  /**
   * یک رویداد را برای پردازش توسط موتور قوانین ارسال می‌کند
   * @param {string} eventName - نام رویداد (مثلاً 'INITIAL_INTERACTION')
   * @param {object} [payload] - داده‌های اضافی مرتبط با رویداد
   */
  triggerEvent: (eventName, payload) => {
    const state = useGameStore.getState();
    const actions = {
      addPoints: state.addPoints,
      addBadge: state.addBadge,
    };

    // بررسی می‌کند که آیا قانونی برای این رویداد وجود دارد یا نه
    if (rules[eventName]) {
      // قانون مربوطه را اجرا می‌کند
      rules[eventName](state, actions, payload);
    } else {
      console.warn(`No rule defined for event: ${eventName}`);
    }
  },

  /**
   * یک هوک React برای دسترسی به وضعیت فعلی بازی فراهم می‌کند
   * این هوک در کامپوننت‌های UI استفاده خواهد شد
   */
  useStore: useGameStore,
};

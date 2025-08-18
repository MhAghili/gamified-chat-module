// src/gamification-module/engine/rules.js

// لیستی از شناسه‌های نشان‌ها برای خوانایی بهتر
export const BADGES = {
  FIRST_STEP: "FIRST_STEP", // اولین تعامل
  CURIOUS_EXPLORER: "CURIOUS_EXPLORER", // پرسیدن یک سوال خوب
};

// تعریف قوانین: هر رویداد به یک تابع نگاشت می‌شود
// این تابع وضعیت فعلی و داده‌های رویداد را دریافت کرده و اکشن‌های لازم را فراخوانی می‌کند
export const rules = {
  INITIAL_INTERACTION: (state, actions) => {
    // اگر این اولین تعامل کاربر است، به او امتیاز و نشان بده
    if (state.points === 0) {
      actions.addPoints(10);
      actions.addBadge(BADGES.FIRST_STEP);
      console.log(
        "Event: INITIAL_INTERACTION -> Awarded 10 points and FIRST_STEP badge."
      );
    }
  },

  ASKED_QUESTION: (state, actions, payload) => {
    // قانونی برای مثال: اگر سوال شامل کلمه "چگونه" بود، امتیاز بیشتری بده
    if (payload?.questionText?.includes("چگونه")) {
      actions.addPoints(15);
      actions.addBadge(BADGES.CURIOUS_EXPLORER);
      console.log(
        "Event: ASKED_QUESTION (insightful) -> Awarded 15 points and CURIOUS_EXPLORER badge."
      );
    } else {
      actions.addPoints(5);
      console.log("Event: ASKED_QUESTION -> Awarded 5 points.");
    }
  },

  // ... قوانین بیشتر در آینده اینجا اضافه می‌شوند
};

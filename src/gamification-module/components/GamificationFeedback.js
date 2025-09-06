// src/gamification-module/components/GamificationFeedback.js
import React, { useEffect } from "react";
import { gamificationAPI } from "../index"
import BadgeNotification from "./BadgeNotification";
import ScoreDisplay from "./ScoreDisplay";

const GamificationFeedback = ({ triggerNextStep }) => {
  // به نشان جدید و اکشن پاک کردن آن گوش می‌دهیم
  const { newBadge, clearNewBadge } = gamificationAPI.useStore((state) => ({
    newBadge: state.newlyAwardedBadge,
    clearNewBadge: state.clearNewBadge,
  }));

  useEffect(() => {
    // وقتی کامپوننت نمایش داده شد، اگر نشانی وجود داشت،
    // بعد از چند ثانیه به مرحله بعد می‌رویم و نشان را پاک می‌کنیم.
    if (newBadge) {
      setTimeout(() => {
        clearNewBadge();
        triggerNextStep();
      }, 3000); // ۳ ثانیه نمایش اعلان
    } else {
      // اگر نشان جدیدی نبود، بلافاصله به مرحله بعد برو
      triggerNextStep();
    }
  }, [newBadge, clearNewBadge, triggerNextStep]);

  // اگر نشان جدیدی وجود دارد، آن را نمایش بده
  if (newBadge) {
    return <BadgeNotification badgeId={newBadge} />;
  }

  // در غیر این صورت، امتیاز را نمایش بده
  return <ScoreDisplay />;
};

export default GamificationFeedback;

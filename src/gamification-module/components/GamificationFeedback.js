// src/gamification-module/components/GamificationFeedback.js
import React, { useEffect, useRef } from "react";
import { gamificationAPI } from "../index";
import BadgeNotification from "./BadgeNotification";
import ScoreDisplay from "./ScoreDisplay";

const GamificationFeedback = ({ triggerNextStep }) => {
  const { newBadge, clearNewBadge } = gamificationAPI.useStore((state) => ({
    newBadge: state.newlyAwardedBadge,
    clearNewBadge: state.clearNewBadge,
  }));

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) {
      return;
    }
    debugger;

    if (newBadge) {
      hasTriggeredRef.current = true;
      setTimeout(() => {
        clearNewBadge();
        triggerNextStep();
      }, 3000);
    } else {
      hasTriggeredRef.current = true;
      // این خط تغییر کرده است
      // ما اجرا را به بعد از چرخه فعلی رندر منتقل می‌کنیم تا از حلقه جلوگیری کنیم
      setTimeout(() => triggerNextStep(), 0);
    }
  }, [newBadge, clearNewBadge, triggerNextStep]); // triggerNextStep را به آرایه وابستگی اضافه می‌کنیم

  if (newBadge) {
    return (
      <div>
        <BadgeNotification />
      </div>
    );
  }

  return <ScoreDisplay />;
};

export default GamificationFeedback;

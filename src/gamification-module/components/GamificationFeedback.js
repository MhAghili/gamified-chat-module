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

    if (newBadge) {
      hasTriggeredRef.current = true;
      setTimeout(() => {
        clearNewBadge();
        triggerNextStep();
      }, 3000);
    } else {
      hasTriggeredRef.current = true;
      setTimeout(() => triggerNextStep(), 0);
    }
  }, [newBadge, clearNewBadge, triggerNextStep]); 

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

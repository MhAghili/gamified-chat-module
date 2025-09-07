// src/gamification-module/components/EventTrigger.js
import { useEffect, useRef } from "react";
import { gamificationAPI } from "..";

const EventTrigger = ({ triggerNextStep, eventName, payload }) => {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!hasTriggeredRef.current) {
      if (eventName) {
        gamificationAPI.triggerEvent(eventName, payload);
      }
      hasTriggeredRef.current = true;
      // اجرای مرحله بعدی را به انتهای چرخه رندر منتقل کن تا از حلقه جلوگیری شود
      setTimeout(() => {
        if (triggerNextStep) triggerNextStep();
      }, 0);
    }
  }, [eventName, payload, triggerNextStep]);

  return null;
};

export default EventTrigger;

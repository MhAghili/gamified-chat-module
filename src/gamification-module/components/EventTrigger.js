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
      setTimeout(() => {
        if (triggerNextStep) triggerNextStep();
      }, 0);
    }
  }, [eventName, payload, triggerNextStep]);

  return null;
};

export default EventTrigger;

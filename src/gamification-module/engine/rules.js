export const BADGES = {
  FIRST_INTERACTION: "FIRST_INTERACTION",
  INSIGHTFUL_QUESTION: "INSIGHTFUL_QUESTION",
  KNOWLEDGE_SEEKER: "KNOWLEDGE_SEEKER",
};

export const rules = {
  USER_INTERACTED: (getState, setState, payload) => {
    const { points, addPoints, addBadge } = getState();
    if (points === 0) {
      addPoints(10);
      addBadge(BADGES.FIRST_INTERACTION);
      console.log(
        "Event: USER_INTERACTED -> First interaction points awarded."
      );
    }
  },

  USER_ASKED_QUESTION: (getState, setState, payload) => {
    const { addPoints, addBadge } = getState();
    const questionText = payload?.questionText || "";

    if (questionText.includes("چگونه")) {
      addPoints(15);
      addBadge(BADGES.INSIGHTFUL_QUESTION);
      console.log("Event: USER_ASKED_QUESTION (insightful) -> Points awarded.");
    } else {
      addPoints(5);
      console.log("Event: USER_ASKED_QUESTION -> Points awarded.");
    }

    if (questionText.includes("راهنما")) {
      addPoints(20);
      addBadge(BADGES.KNOWLEDGE_SEEKER);
      console.log(
        "Event: USER_ASKED_QUESTION (knowledge seeker) -> Badge awarded."
      );
    }
  },
};

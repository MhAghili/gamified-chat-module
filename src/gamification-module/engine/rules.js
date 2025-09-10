
export const BADGES = {
  FIRST_INTERACTION: "FIRST_INTERACTION",
  INSIGHTFUL_QUESTION: "INSIGHTFUL_QUESTION",
  KNOWLEDGE_SEEKER: "KNOWLEDGE_SEEKER",
  CODE_SHARER: "CODE_SHARER",
  CURIOUS_STREAK: "CURIOUS_STREAK",
};

const INSIGHTFUL_KEYWORDS = [
  "چگونه",
  "چرا",
  "چطور",
  "تفاوت",
  "مقایسه",
  "بهینه",
  "بهترین",
  "راه‌حل",
];
const KNOWLEDGE_KEYWORDS = [
  "راهنما",
  "راهنمایی",
  "مستندات",
  "داکیومنت",
  "آموزش",
  "مثال",
  "نمونه",
  "یادگیری",
  "مطالعه",
  "کتاب",
  "منابع",
  "منبع",
  "مقاله",
];
const STREAK_THRESHOLD = 3; 
const STREAK_TIMEOUT_MS = 10 * 60 * 1000; 

export const rules = {
  USER_INTERACTED: (getState) => {
    const { points, addPoints, addBadge } = getState();
    if (points === 0) {
      addPoints(10);
      addBadge(BADGES.FIRST_INTERACTION);
    }
  },

  USER_ASKED_QUESTION: (getState, setState, payload) => {
    const {
      addPoints,
      addBadge,
      incrementStreak,
      resetStreak,
      questionStreak,
      lastQuestionTimestamp,
    } = getState();
    const questionText = payload?.questionText?.toLowerCase() || "";
    let awardedPoints = 5; 
    if (
      INSIGHTFUL_KEYWORDS.some((keyword) => questionText.includes(keyword)) ||
      questionText.length > 50
    ) {
      awardedPoints += 15;
      addBadge(BADGES.INSIGHTFUL_QUESTION);
    }

    if (KNOWLEDGE_KEYWORDS.some((keyword) => questionText.includes(keyword))) {
      awardedPoints += 10;
      addBadge(BADGES.KNOWLEDGE_SEEKER);
    }

    if (questionText.includes("```")) {
      awardedPoints += 25;
      addBadge(BADGES.CODE_SHARER);
    }

    const now = Date.now();
    if (
      lastQuestionTimestamp &&
      now - lastQuestionTimestamp < STREAK_TIMEOUT_MS
    ) {
      incrementStreak();
      if (questionStreak + 1 === STREAK_THRESHOLD) {
        awardedPoints += 30;
        addBadge(BADGES.CURIOUS_STREAK);
      }
    } else {
      resetStreak();
    }

    addPoints(awardedPoints);
  },
};

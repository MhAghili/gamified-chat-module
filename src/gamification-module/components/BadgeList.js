import React from "react";
import styled from "styled-components";
import { gamificationAPI } from "../../gamification-module";

const BADGE_DEFINITIONS = {
  FIRST_INTERACTION: {
    title: "🏆 اولین قدم!",
    description: "اولین تعامل موفق با چت‌بات.",
  },
  INSIGHTFUL_QUESTION: {
    title: "🏆 کاوشگر کنجکاو!",
    description: "پرسیدن یک سوال عمیق و هوشمندانه.",
  },
  KNOWLEDGE_SEEKER: {
    title: "🎓 دانشجو!",
    description: "جستجو برای راهنما و مستندات.",
  },
  CODE_SHARER: {
    title: "💻 کدنویس!",
    description: "به اشتراک گذاشتن یک قطعه کد.",
  },
  CURIOUS_STREAK: {
    title: "🔥 کنجکاو پیگیر!",
    description: "پرسیدن ۳ سوال پشت سر هم.",
  },
};

const BadgeListWrapper = styled.div`
  padding: 10px;
  font-family: "MyPersianFont", Arial, sans-serif;
  width: 240px;
`;

const BadgeItem = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
`;

const BadgeTitle = styled.h4`
  margin: 0;
  font-size: 15px;
`;

const BadgeDescription = styled.p`
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #555;
`;

const NoBadgeMessage = styled.p`
  font-size: 14px;
  color: #888;
  text-align: center;
`;

const BadgeList = () => {
  const earnedBadges = gamificationAPI.useStore((state) => state.badges);

  if (earnedBadges.length === 0) {
    return (
      <BadgeListWrapper>
        <NoBadgeMessage>
          هنوز هیچ دستاوردی کسب نکرده‌ای. به تلاشت ادامه بده!
        </NoBadgeMessage>
      </BadgeListWrapper>
    );
  }

  return (
    <BadgeListWrapper>
      {earnedBadges.map((badgeId) => (
        <BadgeItem key={badgeId}>
          <BadgeTitle>
            {BADGE_DEFINITIONS[badgeId]?.title || "دستاورد"}
          </BadgeTitle>
          <BadgeDescription>
            {BADGE_DEFINITIONS[badgeId]?.description || ""}
          </BadgeDescription>
        </BadgeItem>
      ))}
    </BadgeListWrapper>
  );
};

export default BadgeList;

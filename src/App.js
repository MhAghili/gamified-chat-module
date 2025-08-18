// src/App.js
import { useEffect } from "react";
import { gamificationAPI } from "./gamification-module";

function App() {
  useEffect(() => {
    // --- شبیه‌سازی تعامل کاربر با چت‌بات ---

    // ۱. ماژول را برای کاربری با شناسه 'user-123' راه‌اندازی کن
    gamificationAPI.init("user-123");

    // ۲. شبیه‌سازی اولین تعامل کاربر
    gamificationAPI.triggerEvent("INITIAL_INTERACTION");

    // ۳. شبیه‌سازی پرسیدن یک سوال ساده
    gamificationAPI.triggerEvent("ASKED_QUESTION", { questionText: "سلام" });

    // ۴. شبیه‌سازی پرسیدن یک سوال عمیق‌تر
    gamificationAPI.triggerEvent("ASKED_QUESTION", {
      questionText: "چگونه می‌توانم پروفایلم را ویرایش کنم؟",
    });

    // برای دیدن تغییرات امتیاز و نشان‌ها، کنسول مرورگر را باز کنید
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>تست ماژول گیمیفیکیشن</h1>
      <p>برای دیدن لاگ‌های رویدادها، کنسول مرورگر (F12) را باز کنید.</p>
    </div>
  );
}

export default App;

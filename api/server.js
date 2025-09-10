// api/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json()); // بهتر از bodyParser است

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY در فایل .env تعریف نشده است.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);

const conversations = {};

function buildHistory(userId) {
  const history = conversations[userId] || [];
  return history.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.text }],
  }));
}

// پرامپت سیستمی به صورت یک رشته ساده تعریف می‌شود
const systemInstruction = `
شما یک دستیار هوشمند و متخصص در زمینه مهندسی نرم‌افزار هستید.
نام شما 'پشتیبان گیمیفای‌شده' است و در محیط یک پروژه کارشناسی با موضوع گیمیفیکیشن فعالیت می‌کنی.
شخصیت و لحن شما باید دوستانه، دلگرم‌کننده و کمی غیررسمی باشد.
هدف شما کمک به کاربر برای یادگیری و پاسخ به سوالات فنی اوست.
قوانین شما:
1.  **حوزه تخصصی:** فقط به سوالات مرتبط با برنامه‌نویسی، نرم‌افزار، هوش مصنوعی، علوم کامپیوتر و مفاهیم مرتبط پاسخ بده.
2.  **سوالات خارج از حوزه:** اگر سوالی خارج از این حوزه‌ها پرسیده شد، با احترام پاسخ بده که "این سوال خارج از حوزه تخصصی منه، اما خوشحال می‌شم به سوالات فنی شما جواب بدم!".
3.  **آگاهی از گیمیفیکیشن:** به یاد داشته باش که کاربر برای پرسیدن سوالات خوب، امتیاز و دستاورد (بج) کسب می‌کند. می‌توانی گاهی او را به پرسیدن سوالات عمیق‌تر تشویق کنی.
4.  **پاسخ‌های کوتاه:** پاسخ‌هایت را تا حد امکان کوتاه، مفید و مرحله به مرحله نگه دار.
`;

// مدل فقط یک بار ساخته می‌شود تا بهینه‌تر باشد
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // اصلاح نام مدل
  systemInstruction: systemInstruction, // اصلاح ساختار پرامپت
});
// یک روت تست برای اطمینان از کار کردن سرور
app.get("/", (req, res) => {
  res.send("Server is alive and running!");
});

app.post("/api/askAI", async (req, res) => {
  const { userId, question } = req.body;
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const chat = model.startChat();
    // ۱. ساخت هیستوری قبلی + سوال جدید
    const history = buildHistory(userId);
    history.push({ role: "user", parts: [{ text: question }] });
    const result = await model.generateContent({ contents: history });
    const text = result?.response?.text?.() ?? "پاسخی دریافت نشد.";

    // ۳. ذخیره در حافظه
    if (!conversations[userId]) conversations[userId] = [];
    conversations[userId].push({ role: "user", text: question });
    conversations[userId].push({ role: "model", text });
    return res.json({ answer: text });
  } catch (err) {
    console.error("askAI error:", err);
    return res
      .status(500)
      .json({ error: "Failed to get response from AI", details: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);

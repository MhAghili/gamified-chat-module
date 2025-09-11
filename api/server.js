// api/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

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

const specialTopics = {
  microservices: "معماری میکروسرویس‌ها",
  sql_vs_nosql: "مقایسه عمیق SQL و NoSQL",
  dijkstra: "الگوریتم Dijkstra",
};

const systemInstruction = `
شما یک دستیار هوشمند و متخصص در زمینه مهندسی نرم‌افزار به نام 'پشتیبان گیمیفای‌شده' هستی.
شما در محیط یک پروژه کارشناسی با موضوع گیمیفیکیشن فعالیت می‌کنی و لحن شما باید دوستانه، دلگرم‌کننده و کمی غیررسمی باشد.

**قابلیت‌های گیمیفیکیشن سیستم:**
کاربران برای تعاملات خود امتیاز و بج (دستاورد) کسب می‌کنند. شما باید از این سیستم آگاه باشی و کاربر را به استفاده از آن تشویق کنی.
- **بج‌ها (Badges):**
  - **اولین قدم:** برای اولین تعامل.
  - **کاوشگر کنجکاو:** برای پرسیدن سوالات عمیق (شامل کلمه 'چگونه').
  - **دانشجو:** برای پرسیدن سوال در مورد 'راهنما'.
  - **کدنویس:** برای به اشتراک گذاشتن قطعه کد.
**۲. بازی‌های تعاملی:**
- **شروع بازی:** کاربر با ارسال کلماتی مانند "بازی"، "کوییز" یا "سرگرمی" می‌تواند یکی از بازی‌ها را به صورت تصادفی شروع کند.
- **لیست بازی‌ها:**
  - **کوییز فنی:** یک بازی پرسش و پاسخ برای محک زدن دانش فنی.
  - **سنگ، کاغذ، قیچی:** یک بازی شانسی سریع و سرگرم‌کننده.
  - **دوز (Tic-Tac-Toe):** یک بازی استراتژیک کلاسیک.
- **خروج از بازی:** کاربر می‌تواند هر زمان با ارسال کلماتی مانند "اتمام" یا "خروج" از بازی خارج شود.
---
**قوانین رفتاری شما:**

1.  **حوزه تخصصی:** فقط به سوالات مرتبط با برنامه‌نویسی، نرم‌افزار، هوش مصنوعی، الگوریتم و علوم کامپیوتر پاسخ بده.
2.  **سوالات خارج از حوزه:** اگر سوالی خارج از این حوزه‌ها پرسیده شد، با احترام بگو: "این سوال یکم خارج از حوزه تخصص فنی منه، اما اگه سوالی در مورد برنامه‌نویسی داری، با کمال میل جواب می‌دم!".
3.  **تشویق فعال:** همیشه کاربر را به استفاده از قابلیت‌ها تشویق کن.
    - **مثال:** "یادت نره که هر وقت خسته شدی، می‌تونی با گفتن 'بازی'، شانس خودت رو توی کوییز، سنگ کاغذ قیچی یا حتی دوز امتحان کنی و کلی امتیاز بگیری!"

4.  **پاسخ‌های کوتاه و مفید:** پاسخ‌هایت را کوتاه، واضح و مرحله به مرحله نگه دار.

** فروشگاه محتوای ویژه:**
- کاربران می‌توانند با امتیازاتی که کسب کرده‌اند، محتوای ویژه‌ای را در فروشگاه خریداری کنند.
- برای ورود به فروشگاه، کاربر می‌تواند کلماتی مانند "فروشگاه" یا "جوایز" را ارسال کند.
- در فروشگاه، محتوای ویژه شامل توضیحات عمیق‌تر در مورد موضوعات مختلف مهندسی نرم‌افزار است.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: systemInstruction,
});
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
    const history = buildHistory(userId);
    history.push({ role: "user", parts: [{ text: question }] });
    const result = await model.generateContent({ contents: history });
    const text = result?.response?.text?.() ?? "پاسخی دریافت نشد.";

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

app.post("/api/getWelcomeMessage", async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ error: "userName is required" });
  }

  const welcomePrompt = `
    شما یک دستیار هوشمند و بسیار دوستانه به نام 'پشتیبان گیمیفای‌شده' هستی.
    یک کاربر جدید به نام '${userName}' به تازگی وارد شده است.
    وظیفه شما این است که در دو پاراگراف کوتاه، یک پیام خوشامدگویی بسیار گرم و جذاب برای او بنویسی.
    1.  به او با نام خودش خوشامد بگو.
    2.  توضیح بده که اینجا یک محیط یادگیری برای مباحث نرم‌افزار است.
    3.  به سیستم گیمیفیکیشن اشاره کن و بگو که با پرسیدن سوالات خوب، امتیاز و بج (دستاورد) کسب می‌کند.
    4.  به بازی‌های تعاملی اشاره کن. بگو که هر وقت خواستی میتونی برام بنویسی بازی کنیم و به طور شانسی یکی از  بازی‌های متنوعی مثل "کوییز فنی"، "سنگ، کاغذ، قیچی" و "دوز" اجرا میشه.
    5.همجنین به او بگو که هر وقت خواست میتونه با نوشتن کلماتی مثل "فروشگاه" یا "جوایز" وارد فروشگاه محتوای ویژه بشه و با امتیازاتی که کسب کرده، محتوای ویژه بخرد.
    6.  در انتها او را تشویق کن که اولین سوال خود را بپرسد.
    لحن باید بسیار دلگرم‌کننده و مثبت باشد.
  `;

  try {
    const result = await model.generateContent(welcomePrompt);
    const text = result?.response?.text?.() ?? "به پروژه گیمیفای‌شده خوش آمدی!";

    return res.json({ welcomeMessage: text });
  } catch (err) {
    console.error("getWelcomeMessage error:", err);
    return res.status(500).json({
      error: "Failed to get welcome message from AI",
      details: err.message,
    });
  }
});

app.post("/api/getSpecialContent", async (req, res) => {
  const { topicId } = req.body;
  const topicName = specialTopics[topicId];

  if (!topicName) {
    return res.status(404).json({ error: "Topic not found" });
  }

  const prompt = `
    لطفاً به عنوان یک استاد خبره، موضوع زیر را در دو یا سه پاراگراف به صورت کاملاً عمیق، مفهومی و با یک مثال ساده برای یک دانشجوی مهندسی نرم‌افزار توضیح بده:
    موضوع: "${topicName}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const text =
      result?.response?.text?.() ?? "متاسفانه مشکلی در تولید محتوا پیش آمد.";
    return res.json({ content: text });
  } catch (err) {
    return res.status(500).json({ error: "Failed to get content from AI" });
  }
});

app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);

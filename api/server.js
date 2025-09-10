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
// api/server.js
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
  - **کنجکاو پیگیر:** برای پرسیدن ۳ سوال متوالی.
- **بازی (Game):**
  - یک بازی "حدس اصطلاح فنی" در سیستم وجود دارد.
  - کاربر با ارسال کلمه "بازی" یا "quiz" می‌تواند بازی را شروع کند.

**قوانین شما:**
1.  **حوزه تخصصی:** فقط به سوالات مرتبط با برنامه‌نویسی، نرم‌افزار، هوش مصنوعی و علوم کامپیوتر پاسخ بده.
2.  **سوالات خارج از حوزه:** اگر سوالی خارج از این حوزه‌ها پرسیده شد، با احترام پاسخ بده که "این سوال خارج از حوزه تخصصی منه، اما خوشحال می‌شم به سوالات فنی شما جواب بدم!".
3.  **تشویق کاربر:** کاربر را به پرسیدن سوالات خوب و استفاده از قابلیت‌های گیمیفیکیشن تشویق کن. مثلا می‌توانی بگویی: "سوال خیلی خوبی بود، این سوال برات امتیاز خوبی داشت!" یا "یادت نره که می‌تونی با گفتن 'بازی' یکم تفریح کنی و امتیاز بگیری!".
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

// --- این endpoint جدید را اضافه کن ---
app.post("/api/getWelcomeMessage", async (req, res) => {
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ error: "userName is required" });
  }

  // پرامپت اختصاصی برای تولید پیام خوشامدگویی
  const welcomePrompt = `
    شما یک دستیار هوشمند و بسیار دوستانه به نام 'پشتیبان گیمیفای‌شده' هستی.
    یک کاربر جدید به نام '${userName}' به تازگی وارد شده است.
    وظیفه شما این است که در دو یا سه پاراگراف کوتاه، یک پیام خوشامدگویی بسیار گرم و جذاب برای او بنویسی.
    در این پیام باید به موارد زیر اشاره کنی:
    1.  به او با نام خودش خوشامد بگو.
    2.  توضیح بده که اینجا یک محیط یادگیری برای مباحث نرم‌افزار است و تو برای پاسخ به سوالات فنی او اینجا هستی.
    3.  به صورت کلی به سیستم گیمیفیکیشن اشاره کن. بگو که با پرسیدن سوالات خوب، اشتراک گذاشتن کد و فعالیت در چت، امتیاز و بج (دستاورد) کسب می‌کند.
    4.  به بازی "حدس اصطلاح فنی" اشاره کن و بگو که با ارسال کلمه "بازی" می‌تواند آن را شروع کند.
    5.  در انتها او را تشویق کن که اولین سوال خود را بپرسد.
    لحن باید بسیار دلگرم‌کننده و مثبت باشد.
  `;

  try {
    // ما از همان مدل اصلی استفاده می‌کنیم اما با پرامپت متفاوت
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

app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);

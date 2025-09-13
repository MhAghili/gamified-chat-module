// src/chatbot/gameQuestions.js

export const gameQuestions = [
  // 1-10: مفاهیم پایه (easy)
  {
    category: "مفاهیم پایه",
    question:
      "به مجموعه‌ای از قوانین برای نوشتن کد در یک زبان خاص چه می‌گویند؟",
    answers: ["سینتکس", "نحو", "syntax"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "یک خطای منطقی در برنامه که باعث رفتار غیرمنتظره می‌شود چیست؟",
    answers: ["باگ", "خطا", "bug"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "فرآیند پیدا کردن و رفع خطاها در کد چه نام دارد؟",
    answers: ["دیباگ", "اشکال‌زدایی", "debug"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "نمایش گرافیکی مراحل یک الگوریتم را چه می‌گویند؟",
    answers: ["فلوچارت", "نمودار جریان"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question:
      "نسخه‌ای از نرم‌افزار که برای تست به گروه کوچکی داده می‌شود چیست؟",
    answers: ["بتا", "نسخه بتا", "beta"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question:
      "به تغییراتی که برای خواناتر کردن کد انجام می‌شود و عملکرد را تغییر نمی‌دهد چه می‌گویند؟",
    answers: ["ریفکتور", "بازسازی کد", "refactor"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "برنامه‌ای که برای تست قطعات کوچک نوشته می‌شود را چه می‌نامند؟",
    answers: ["تست یونیت", "واحد تست", "unit test"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "به متغیری که مقدار ثابت دارد چه می‌گویند؟",
    answers: ["ثابت", "const", "constant"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "فرآیند تبدیل کد سطح بالا به کد ماشین را چه می‌گویند؟",
    answers: ["کامپایل", "مترجم", "compile"],
    difficulty: "easy",
  },
  {
    category: "مفاهیم پایه",
    question: "به خطایی که در زمان اجرا رخ می‌دهد چه می‌گویند؟",
    answers: ["خطای زمان اجرا", "ران‌تایم ارور", "runtime error"],
    difficulty: "easy",
  },

  // 11-20: وب (easy)
  {
    category: "وب",
    question: "زبان اصلی ساختار صفحات وب چیست؟",
    answers: ["HTML", "اچ‌تی‌ام‌ال", "اچ تی ام ال"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "فناوری اصلی برای استایل‌دهی صفحات وب چیست؟",
    answers: ["CSS", "سی‌اس‌اس", "css"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "محبوب‌ترین کتابخانه جاوااسکریپت برای رابط کاربری کدام است؟",
    answers: ["ری‌اکت", "React", "react"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "فرمت سبک و خوانا برای تبادل داده چیست؟",
    answers: ["JSON", "جیسون", "json"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "درخواست از کلاینت به سرور را چه می‌نامند؟",
    answers: ["درخواست", "ریکوئست", "request"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "پروتکلی که صفحات وب امن را منتقل می‌کند چیست؟",
    answers: ["HTTPS", "اچ‌تی‌تی‌پس", "https"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "ابزاری برای طراحی ریسپانسیو و اجزای آماده چیست؟",
    answers: ["بوت‌استرپ", "Bootstrap", "bootstrap"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "API مرورگر برای ذخیره‌سازی دادهٔ محلی چیست؟",
    answers: ["localStorage", "Local Storage", "local storage"],
    difficulty: "easy",
  },
  {
    category: "وب",
    question: "به فرآیند به‌روزرسانی نمایش بدون رفرش کل صفحه چه می‌گویند؟",
    answers: ["AJAX", "ای‌جکس", "ajax"],
    difficulty: "medium",
  },
  {
    category: "وب",
    question: "مفهوم CSR در وب یعنی چه؟",
    answers: ["render سمت کاربر", "Client-Side Rendering", "csr"],
    difficulty: "medium",
  },

  // 21-30: بک‌اند (easy/medium)
  {
    category: "بک‌اند",
    question: "محیط اجرایی جاوااسکریپت در سمت سرور را چه می‌نامند؟",
    answers: ["Node.js", "نود جی‌اس", "نود"],
    difficulty: "easy",
  },
  {
    category: "بک‌اند",
    question: "فریم‌ورک پرکاربرد Node.js برای ساخت API چیست؟",
    answers: ["Express", "اکسپرس", "express"],
    difficulty: "easy",
  },
  {
    category: "بک‌اند",
    question: "پایگاه داده رابطه‌ای از چه زبانی برای کوئری استفاده می‌کند؟",
    answers: ["SQL", "اس‌کیوال", "sql"],
    difficulty: "easy",
  },
  {
    category: "بک‌اند",
    question: "پایگاه داده سند-گرا مثال معروفش چیست؟",
    answers: ["MongoDB", "مانگو دی‌بی", "mongodb"],
    difficulty: "medium",
  },
  {
    category: "بک‌اند",
    question:
      "به عملکردی که پاسخ را در حافظه نگهداری می‌کند تا سریع‌تر شود چه می‌گویند؟",
    answers: ["کشینگ", "cache", "caching"],
    difficulty: "medium",
  },
  {
    category: "بک‌اند",
    question: "روتینگ در سرور به چه معناست؟",
    answers: ["مسیردهی درخواست", "تعریف endpoint", "routing"],
    difficulty: "easy",
  },
  {
    category: "بک‌اند",
    question:
      "به فرآیندی که داده‌ها از کلاینت به سرور و بین سرویس‌ها منتقل می‌شود چه می‌گویند؟",
    answers: ["انتقال داده", "data transfer", "integration"],
    difficulty: "medium",
  },
  {
    category: "بک‌اند",
    question: "چطور می‌توان هزینهٔ درخواست به پایگاه داده را کاهش داد؟",
    answers: ["کشینگ", "index گذاری", "بهینه‌سازی کوئری"],
    difficulty: "hard",
  },
  {
    category: "بک‌اند",
    question: "به چه چیزی middleware در Express گفته می‌شود؟",
    answers: ["میان‌افزار", "middleware", "افزودنی"],
    difficulty: "medium",
  },
  {
    category: "بک‌اند",
    question: "به نقطهٔ انتهایی در API چه می‌گویند؟",
    answers: ["Endpoint", "نقطه پایانی", "api endpoint"],
    difficulty: "easy",
  },

  // 31-40: پایگاه داده (medium)
  {
    category: "دیتابیس",
    question: "پایگاه داده رابطه‌ای معروف چیست؟",
    answers: ["PostgreSQL", "پستگرس", "postgres"],
    difficulty: "medium",
  },
  {
    category: "دیتابیس",
    question: "کلید اصلیِ یکتا در جدول را چه می‌نامند؟",
    answers: ["پرایمری کی", "کلید اصلی", "primary key"],
    difficulty: "easy",
  },
  {
    category: "دیتابیس",
    question: "چه چیزی برای افزایش سرعت جستجو در جدول استفاده می‌شود؟",
    answers: ["ایندکس", "index", "indexing"],
    difficulty: "medium",
  },
  {
    category: "دیتابیس",
    question: "پایگاه داده NoSQL یک مثال معروف چیست؟",
    answers: ["MongoDB", "Redis", "Cassandra"],
    difficulty: "medium",
  },
  {
    category: "دیتابیس",
    question: "ACID در دیتابیس مخفف چیست؟",
    answers: ["Atomicity Consistency Isolation Durability", "ACID"],
    difficulty: "hard",
  },
  {
    category: "دیتابیس",
    question: "یک پایگاه داده‌ی کلید-مقدار محبوب چیست؟",
    answers: ["Redis", "ردیس", "redis"],
    difficulty: "easy",
  },
  {
    category: "دیتابیس",
    question: "به عملیات تهیهٔ نسخهٔ پشتیبان از دیتابیس چه می‌گویند؟",
    answers: ["بکاپ", "پشتیبان‌گیری", "backup"],
    difficulty: "easy",
  },
  {
    category: "دیتابیس",
    question: "ORM چیست؟",
    answers: ["Object Relational Mapping", "نقشه‌برداری شی-رابطه‌ای", "ORM"],
    difficulty: "medium",
  },
  {
    category: "دیتابیس",
    question: "نرمال‌سازی داده‌ها چه هدفی دارد؟",
    answers: ["کاهش افزونگی", "بهبود سازگاری داده", "normalization"],
    difficulty: "medium",
  },
  {
    category: "دیتابیس",
    question: "ACID vs BASE بیشتر در چه زمینه‌ای بررسی می‌شود؟",
    answers: ["پایگاه داده توزیع‌شده", "Consistency مدل‌ها", "CAP theorem"],
    difficulty: "hard",
  },

  // 41-50: الگوریتم و ساختمان داده (medium/hard)
  {
    category: "الگوریتم",
    question: "ساختمان داده‌ای که LIFO را پیروی می‌کند چیست؟",
    answers: ["پشته", "stack"],
    difficulty: "easy",
  },
  {
    category: "الگوریتم",
    question: "ساختمان داده‌ای که FIFO را پیروی می‌کند چیست؟",
    answers: ["صف", "queue"],
    difficulty: "easy",
  },
  {
    category: "الگوریتم",
    question: "مرتب‌سازی که از تقسیم و حل استفاده می‌کند چیست؟",
    answers: ["کوئیک‌سورت", "quick sort", "quicksort"],
    difficulty: "medium",
  },
  {
    category: "الگوریتم",
    question: "الگوریتمی برای یافتن کوتاه‌ترین مسیر در گراف چیست؟",
    answers: ["دایکسترا", "Dijkstra", "dijkstra"],
    difficulty: "medium",
  },
  {
    category: "الگوریتم",
    question: "جستجوی باینری در آرایه مرتب چه پیچیدگی زمانی دارد؟",
    answers: ["O(log n)", "اُ لگاریتمی"],
    difficulty: "medium",
  },
  {
    category: "الگوریتم",
    question:
      "برای یافتن مولفه‌های پیوسته در گراف معمولاً از چه الگوریتمی استفاده می‌شود؟",
    answers: ["DFS", "Depth First Search", "جستجوی عمقی"],
    difficulty: "medium",
  },
  {
    category: "الگوریتم",
    question:
      "برای حل مسائل بهینه‌سازی از چه روشِ مشهورِ تقسیم‌بندی استفاده می‌کنند؟",
    answers: ["برش و حاکمیت", "divide and conquer", "تقسیم و حل"],
    difficulty: "hard",
  },
  {
    category: "الگوریتم",
    question:
      "الگوریتمی که از صف اولویت برای گره‌ها استفاده می‌کند چه نام دارد؟",
    answers: ["Dijkstra", "A*", "جستجوی A ستاره"],
    difficulty: "hard",
  },
  {
    category: "الگوریتم",
    question: "یک ساختمان دادهٔ درختی که هر گره حداکثر دو فرزند دارد چیست؟",
    answers: ["درخت دودویی", "binary tree"],
    difficulty: "easy",
  },
  {
    category: "الگوریتم",
    question: "پیچیدگی زمانی مرج‌سورت چیست؟",
    answers: ["O(n log n)", "اُ ان لاگ آن"],
    difficulty: "medium",
  },

  // 51-60: پیشرفته و الگوها (medium/hard)
  {
    category: "پیشرفته",
    question: "الگوی طراحی که وابستگان را هنگام تغییر وضعیت مطلع می‌کند چیست؟",
    answers: ["آبزرور", "Observer", "ناظر"],
    difficulty: "medium",
  },
  {
    category: "پیشرفته",
    question: "معماری‌ای که برنامه را به سرویس‌های کوچک تقسیم می‌کند چیست؟",
    answers: ["میکروسرویس", "microservices", "micro service"],
    difficulty: "medium",
  },
  {
    category: "پیشرفته",
    question: "پترن نرم‌افزاری singleton چه کاری انجام می‌دهد؟",
    answers: ["یک نمونه واحد", "یک نمونه از کلاس", "single instance"],
    difficulty: "medium",
  },
  {
    category: "پیشرفته",
    question: "مفهوم event-driven architecture چیست؟",
    answers: ["معماری رویدادمحور", "رویدادی"],
    difficulty: "hard",
  },
  {
    category: "پیشرفته",
    question: "تست پوششی که تمام شاخه‌ها را بررسی کند را چه می‌نامند؟",
    answers: ["branch coverage", "پوشش شاخه"],
    difficulty: "hard",
  },
  {
    category: "پیشرفته",
    question:
      "معماری‌ای که بر مبنای کانتینرها و اورکستریشن است را چه می‌نامند؟",
    answers: ["کوبِرنتیز", "Kubernetes", "k8s"],
    difficulty: "hard",
  },
  {
    category: "پیشرفته",
    question:
      "به تبدیل API قدیمی به نسخهٔ جدید بدون شکستن مشتریان چه می‌گویند؟",
    answers: ["سازگاری رو به عقب", "backward compatibility"],
    difficulty: "hard",
  },
  {
    category: "پیشرفته",
    question: "معنای coupling و cohesion چیست؟",
    answers: ["وابستگی و همبستگی", "coupling cohesion"],
    difficulty: "hard",
  },
  {
    category: "پیشرفته",
    question: "چه زمانی از معماری تک‌منبع (monolith) استفاده می‌شود؟",
    answers: ["زمانی که پیچیدگی پایین است", "monolith"],
    difficulty: "medium",
  },
  {
    category: "پیشرفته",
    question: "تفاوت synchronous و asynchronous چیست؟",
    answers: ["همزمان و ناهمزمان", "synchronous asynchronous"],
    difficulty: "medium",
  },

  // 61-70: گیمیفیکیشن (easy/medium)
  {
    category: "گیمیفیکیشن",
    question: "به فرایند استفاده از عناصر بازی در زمینهٔ غیر بازی چه می‌گویند؟",
    answers: ["گیمیفیکیشن", "gamification"],
    difficulty: "easy",
  },
  {
    category: "گیمیفیکیشن",
    question: "عنصری که برای به رسمیت شناختن دستاورد داده می‌شود چیست؟",
    answers: ["بج", "نشانه", "badge"],
    difficulty: "easy",
  },
  {
    category: "گیمیفیکیشن",
    question: "به جدول رتبه‌بندی کاربران چه می‌گویند؟",
    answers: ["لیدربورد", "leaderboard"],
    difficulty: "easy",
  },
  {
    category: "گیمیفیکیشن",
    question: "یک چرخهٔ انگیزش-عمل-بازخورد را چه می‌نامند؟",
    answers: ["گیم‌لوپ", "game loop"],
    difficulty: "medium",
  },
  {
    category: "گیمیفیکیشن",
    question: "انگیزهٔ بیرونی که با پاداش بیرونی ایجاد می‌شود را چه می‌نامند؟",
    answers: ["پاداش بیرونی", "Extrinsic reward"],
    difficulty: "medium",
  },
  {
    category: "گیمیفیکیشن",
    question: "چارچوب معروف تحلیل انگیزش Octalysis چه کار می‌کند؟",
    answers: ["تحلیل انگیزش بازیکن", "octalysis"],
    difficulty: "hard",
  },
  {
    category: "گیمیفیکیشن",
    question: "مکانیکی که کاربران را به رقابت وا می‌دارد چیست؟",
    answers: ["چالش", "مسابقه", "competition"],
    difficulty: "easy",
  },
  {
    category: "گیمیفیکیشن",
    question: "مفهوم progression در بازی یعنی چه؟",
    answers: ["پیشرفت کاربر", "progression", "نردبان پیشرفت"],
    difficulty: "medium",
  },
  {
    category: "گیمیفیکیشن",
    question: "چه چیزی باعث حفظ کاربر در طولانی‌مدت می‌شود؟",
    answers: ["درون‌انگیز بودن", "intrinsic motivation"],
    difficulty: "hard",
  },
  {
    category: "گیمیفیکیشن",
    question: "چگونه می‌توان تقلب در سیستم امتیازدهی را کاهش داد؟",
    answers: ["مکانیزم اعتبارسنجی", "rate limiting", "سرور-side validation"],
    difficulty: "hard",
  },

  // 71-80: هوش مصنوعی و یادگیری ماشین (medium/hard)
  {
    category: "هوش مصنوعی",
    question: "یادگیری نظارت‌شده چیست؟",
    answers: ["یادگیری نظارت‌شده", "supervised learning"],
    difficulty: "medium",
  },
  {
    category: "هوش مصنوعی",
    question: "شبکه عصبی کانولوشنی برای چه نوع داده‌ای متداول است؟",
    answers: ["تصاویر", "CNN", "convolutional neural network"],
    difficulty: "medium",
  },
  {
    category: "هوش مصنوعی",
    question: "روش کاهش overfitting با خاموش کردن نورون‌ها چیست؟",
    answers: ["dropout", "دراپ‌اوت"],
    difficulty: "medium",
  },
  {
    category: "هوش مصنوعی",
    question: "روش کاهش بعد داده که بیشترین واریانس را نگه می‌دارد چیست؟",
    answers: ["PCA", "تحلیل مولفه‌های اصلی", "اصولی"],
    difficulty: "hard",
  },
  {
    category: "هوش مصنوعی",
    question: "کتابخانهٔ معروف پایتون برای deep learning چیست؟",
    answers: ["TensorFlow", "تنسرفلو"],
    difficulty: "easy",
  },
  {
    category: "هوش مصنوعی",
    question: "الگوریتم معروف یادگیری تقویتی برای مسائل جدولی چیست؟",
    answers: ["Q-learning", "کیو-لرنینگ"],
    difficulty: "hard",
  },
  {
    category: "هوش مصنوعی",
    question: "مفهوم fine-tuning در مدل‌های زبانی چیست؟",
    answers: ["آموزش ثانویه", "فاین‌تیون", "fine-tuning"],
    difficulty: "medium",
  },
  {
    category: "هوش مصنوعی",
    question:
      "به مدل‌هایی که برای زبان طبیعی استفاده می‌شوند چه نامیده می‌شوند؟",
    answers: ["مدل زبانی", "Language Model", "LM"],
    difficulty: "easy",
  },
  {
    category: "هوش مصنوعی",
    question: "مقیاس‌پذیری مدل‌های بزرگ چالش‌زاست به دلیل چه عامل‌هایی؟",
    answers: ["حافظه و هزینه محاسباتی", "compute and memory"],
    difficulty: "hard",
  },
  {
    category: "هوش مصنوعی",
    question:
      "به تکنیکی که داده‌های نامتوازن را برای آموزش بهتر مدل تنظیم می‌کند چه می‌گویند؟",
    answers: ["oversampling", "undersampling", "توازن کلاس‌ها"],
    difficulty: "hard",
  },

  // 81-90: امنیت و شبکه (medium/hard)
  {
    category: "امنیت",
    question: "احراز هویت یعنی چه؟",
    answers: ["احراز هویت", "authentication"],
    difficulty: "easy",
  },
  {
    category: "امنیت",
    question: "رمزنگاری متقارن مشهور چیست؟",
    answers: ["AES", "ای‌ای‌اس"],
    difficulty: "medium",
  },
  {
    category: "امنیت",
    question: "رمزنگاری نامتقارن مشهور چیست؟",
    answers: ["RSA", "آر‌اس‌ای"],
    difficulty: "medium",
  },
  {
    category: "امنیت",
    question:
      "حمله‌ای که با ارسال زیاد درخواست باعث اختلال می‌شود چه نام دارد؟",
    answers: ["DDoS", "حمله منع سرویس توزیع‌شده"],
    difficulty: "medium",
  },
  {
    category: "امنیت",
    question: "تزریق SQL چیست؟",
    answers: ["SQL Injection", "تزریق SQL"],
    difficulty: "easy",
  },
  {
    category: "امنیت",
    question: "TLS چه کاربردی دارد؟",
    answers: ["امن‌سازی ارتباطات", "TLS"],
    difficulty: "easy",
  },
  {
    category: "امنیت",
    question: "Cross-Site Scripting را با چه اختصاری می‌شناسند؟",
    answers: ["XSS", "اکس‌اس‌اس"],
    difficulty: "medium",
  },
  {
    category: "امنیت",
    question: "چطور می‌توان مانع از CSRF شد؟",
    answers: ["توکن ضد-CSRF", "SameSite cookie", "CSRF token"],
    difficulty: "hard",
  },
  {
    category: "امنیت",
    question: "مفهوم least privilege به چه معناست؟",
    answers: ["حداقل امتیاز", "کمترین سطح دسترسی"],
    difficulty: "hard",
  },
  {
    category: "امنیت",
    question: "مفهوم 'salt' در رمزنگاری چیست؟",
    answers: ["مقدار تصادفی برای هَش", "salt"],
    difficulty: "medium",
  },

  // 91-100: دی‌ورپس، تست و چالش‌ها (medium/hard)
  {
    category: "دِواپس",
    question: "Docker چیست؟",
    answers: ["Docker", "داکر", "کانتینر"],
    difficulty: "easy",
  },
  {
    category: "دِواپس",
    question: "برای چه از Kubernetes استفاده می‌کنند؟",
    answers: ["ارکستریشن کانتینر", "Kubernetes", "k8s"],
    difficulty: "hard",
  },
  {
    category: "تست",
    question: "آزمون پذیری (testability) یعنی چه؟",
    answers: ["قابلیت تست", "testability"],
    difficulty: "medium",
  },
  {
    category: "تست",
    question: "تفاوت واحد تست و تست یکپارچه چیست؟",
    answers: ["unit vs integration", "تست یونیت و اینتگرِیشن"],
    difficulty: "medium",
  },
  {
    category: "سیستم",
    question: "Load balancer چه کاری انجام می‌دهد؟",
    answers: ["توزیع بار", "تعادل بار", "load balancing"],
    difficulty: "medium",
  },
  {
    category: "پرفرمنس",
    question: "چگونه می‌توان لِیتنسی API را کاهش داد؟",
    answers: ["کشینگ و بهینه‌سازی کوئری", "بهینه‌سازی", "cache"],
    difficulty: "hard",
  },
  {
    category: "مباحث ترکیبی",
    question: "بهینه‌سازی جستجوی متن با چه ساختارهایی انجام می‌شود؟",
    answers: ["اینورته ایندکس", "inverted index", "search index"],
    difficulty: "hard",
  },
  {
    category: "مباحث ترکیبی",
    question: "یک روش محبوب برای مدیریت پیکربندی در محیط‌های مختلف چیست؟",
    answers: ["متغیر محیطی", "environment variables", "env vars"],
    difficulty: "medium",
  },
  {
    category: "مباحث ترکیبی",
    question: "به روند بازخورد سریع از کاربران برای اصلاح محصول چه می‌گویند؟",
    answers: ["feedback loop", "حلقه بازخورد", "گوش دادن به کاربر"],
    difficulty: "medium",
  },
  {
    category: "مباحث ترکیبی",
    question:
      "روش‌های جلوگیری از نشت اطلاعات خصوصی در خروجی مدل شامل چه چیزهایی است؟",
    answers: ["فیلترینگ، redaction، محافظت از prompt", "prompt sanitization"],
    difficulty: "hard",
  },
];

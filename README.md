### FILE: README.md
# Gamified Chatbot — پروژه‌ی کارشناسی

**عنوان:** افزودن قابلیت بازی به چت‌بات‌های پشتیبانی آنلاین با استفاده از گیمیفیکیشن  
**نویسنده:** محمدحسین عقیلی

---

## پیش‌نیازها
- Node.js ≥ 18
- npm
- دسترسی به Google Generative Language API و API Key معتبر

---

## ساختار پیشنهادی
```
project-root/
├─ api/
│  └─ server.js            # Express API
├─ src/                    # React app (chatbot + gamification-module)
├─ package.json
├─ .env.example
└─ README.md
```

---

## نصب وابستگی‌ها
```bash
npm install
```

---

## اسکریپت‌ها
- فقط سرور:
```bash
npm run server
```
- فقط کلاینت:
```bash
npm start
```
- همزمان (توسعه):
```bash
npm run dev
```
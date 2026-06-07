# 🗺️ Jakarta Destination Guide

Aplikasi kuis interaktif untuk menemukan destinasi terbaik di Jakarta berdasarkan preferensi user.

## Tech Stack
- **Next.js 14** (React framework)
- **CSS Modules** (styling)
- **Vercel** (hosting & deployment)

## Struktur Folder

```
jakarta-guide/
├── components/
│   ├── ProgressBar.js        # Bar progress kuis
│   ├── ProgressBar.module.css
│   ├── QuizCard.js           # Kartu pertanyaan
│   ├── QuizCard.module.css
│   ├── ResultCard.js         # Kartu hasil rekomendasi
│   └── ResultCard.module.css
├── data/
│   ├── destinations.js       # Database 19 destinasi Jakarta
│   ├── questions.js          # Data 8 pertanyaan kuis
│   └── scoring.js            # Algoritma weighted scoring
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js              # Halaman utama kuis
├── styles/
│   ├── globals.css
│   └── Home.module.css
├── vercel.json
└── package.json
```

## Cara Jalankan Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka di browser
# http://localhost:3000
```

## Deploy ke Vercel

Ikuti panduan lengkap di README ini atau lihat langkah di bawah.

### Opsi A — Via GitHub (Recommended)
1. Push project ini ke GitHub
2. Buka vercel.com → New Project
3. Import repo → Deploy otomatis ✅

### Opsi B — Via Vercel CLI
```bash
npm install -g vercel
vercel
```

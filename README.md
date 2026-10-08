# 🛒 বাজার দর (BazarDor)

বাজার দর is a small web app to check today's market price of daily need items in Bangladesh — rice, dal, oil, vegetables, fish, meat, egg-milk and spices. You can see which items got costly today, which got cheaper, and compare the price of one item across 12 different bazars of 6 divisions.

All prices, dates and percentages are shown in Bangla numbers.

**Live site:** _coming soon_

---

## ✨ Features

1. **Live price ticker** — a scrolling strip under the navbar with every item's price and today's ▲/▼ change.
2. **Today's risers and fallers** — home page shows top 6 items whose price went up and top 6 that went down.
3. **Category pages** — 8 categories (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) with active link in navbar, skeleton loading and a friendly empty state for wrong category.
4. **Sort by price** — `সাজান` dropdown (ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম). Sorting uses the real number, so Bangla digits never break the order.
5. **Search and filter** — search an item by name and filter by category chips on the home page.
6. **Bazar wise price details (login needed)** — min, max and average price, plus a table of every bazar with its division.
7. **Authentication with BetterAuth** — email/password sign up and sign in, Google and GitHub login, toast message for every action.
8. **Profile and update info** — see your profile, sign out, and change your name from a separate update page.
9. **Fully responsive** — works on mobile, tablet and desktop. Custom 404 page for any wrong link.

## 🛠️ Technologies Used

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** + **DaisyUI 5**
- **BetterAuth** with **MongoDB** adapter
- **react-hot-toast** for notifications
- **react-icons**, Hind Siliguri font (fontsource)
- Deployed on **Vercel**

## 📡 Data

Prices come from the assignment API:

```
https://api.api-store.workers.dev/api/bazardor
https://api.abcz.workers.dev/api/bazardor   (backup)
```

If the first one fails, the app tries the second one.

## 🚀 Run Locally

```bash
git clone https://github.com/Md-Foisal/bazardor.git
cd bazardor
npm install
```

Make a `.env.local` file:

```env
BETTER_AUTH_SECRET=any_long_random_text
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000

## 📁 Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero, today's risers and fallers, all products |
| `/category/[slug]` | Products of one category with sort |
| `/product/[slug]` | Bazar wise price details (protected) |
| `/signin`, `/signup` | Login and registration |
| `/profile` | My profile (protected) |
| `/profile/update` | Update name (protected) |
| `/privacy` | Simple privacy policy (needed for Google login) |

---

Made by **Md. Foisal** — B14 Assignment 07

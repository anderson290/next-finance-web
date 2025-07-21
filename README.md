# 💸 next-finance-web

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![MIT License](https://img.shields.io/badge/license-MIT-green)

> A modern financial platform built with Next.js, focused on authentication, smooth UX, and data visualization.

---

## 🚀 Technologies

- [Next.js](https://nextjs.org/) (App Router + SSR)
- [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Modern authentication (e.g., NextAuth, Clerk)
- ESLint + Prettier
- Deployment with [Vercel](https://vercel.com/)
- (Optional) ORM (Prisma, Drizzle), Hono API, Jest/Vitest

---

## 📦 Installation

```bash
git clone https://github.com/anderson290/next-finance-web
cd next-finance-web
npm install
```

---

## 🧪 Available Scripts

| Command             | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`       | Starts development server            |
| `npm run build`     | Creates production build             |
| `npm run start`     | Runs the app in production mode      |
| `npm run lint`      | Runs ESLint code analysis            |
| `npm run format`    | Formats code with Prettier           |
| `npm test`          | Runs tests (if configured)           |

---

## 🔐 Environment Variables

Create a `.env.local` file based on the example:

```bash
cp .env.example .env.local
```

Set up API keys, database environment variables, etc.

---

## 📁 Folder Structure (suggestion)

```
📦 next-finance-web
├── app/ or pages/        # Application routes
├── components/           # Reusable components
├── lib/ or utils/        # Helper functions
├── styles/               # Tailwind styles and config
├── public/               # Static files
├── prisma/ or db/        # ORM and database access (if any)
```

---

## 📡 Deployment

This project is ready for continuous deployment via [Vercel](https://vercel.com/). After connecting the repository, any push to `main` or `production` will trigger a new deployment.

---

## 📄 License

Distributed under the [MIT](LICENSE) license.

---

## 👤 Author

Made with ❤️ by [Anderson do Carmo Nunes](https://www.linkedin.com/in/andersonnunes29/)  
📫 anderson.nunes290@outlook.com

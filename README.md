This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

src/
├── app/
│   ├── api/                          # API routes (serverless)
│   ├── components/                   # Global components (reusable across pages)
│   │   └── ...                      
│   ├── types/                        # Shared TypeScript types
│   │   └── post.ts                  
│   ├── page.tsx                      # Home page (Server Component)
│   ├── pageClientComponent.tsx       # Home Client Component (optional)
│   ├── page2/                        # Folder for page 2
│   │   ├── page.tsx                  # Server Component for page 2
│   │   └── PostsListClient.tsx       # Client Component for page 2
│   ├── page3/                        # Page 3
│   │   ├── page.tsx                  # Server Component for page 3
│   │   └── ClientComponent3.tsx      # Client Component for page 3
│   ├── page4/                        # Page 4
│   │   ├── page.tsx                 
│   │   └── ClientComponent4.tsx
│   ├── page5/                        # Page 5
│   │   ├── page.tsx                 
│   │   └── ClientComponent5.tsx
│   └── layout.tsx                    # Global layout (e.g., MUI theme, header)
├── styles/
│   └── globals.css
└── theme.ts

API

src/
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   ├── route.ts      # GET, POST, PUT, DELETE to /api/users
│   │   │   └── [id]/
│   │   │       └── route.ts  # GET, PUT, DELETE to /api/users/:id
│   │   ├── products/
│   │   │   ├── route.ts      # GET, POST, etc to /api/products
│   │   │   └── [id]/
│   │   │       └── route.ts  # GET, PUT, DELETE to /api/products/:id
│   │   └── ...               # Other routes API
│   └── ...


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

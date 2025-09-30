# 💸 Next Finance

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![MIT License](https://img.shields.io/badge/license-MIT-green)

> Plataforma financeira moderna construída com Next.js, focada em autenticação, UX fluida e visualização de dados.

---

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) (App Router + SSR)
- [React](https://reactjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Autenticação moderna (ex: NextAuth, Clerk)
- ESLint + Prettier
- Deploy com [Vercel](https://vercel.com/)
- (Opcional) ORM (Prisma, Drizzle), Hono API, Jest/Vitest

---

## 📦 Instalação

```bash
git clone https://github.com/anderson290/next-finance-web
cd next-finance-web
npm install
```

---

## 🧪 Scripts Disponíveis

| Comando             | Descrição                           |
|---------------------|-------------------------------------|
| `npm run dev`       | Inicia servidor de desenvolvimento  |
| `npm run build`     | Cria build para produção            |
| `npm run start`     | Roda aplicação em produção          |
| `npm run lint`      | Executa análise de código com ESLint|
| `npm run format`    | Formata o código com Prettier       |
| `npm test`          | Executa testes (se configurado)     |

---

## 🔐 Variáveis de ambiente

Crie o arquivo `.env.local` com base no exemplo:

```bash
cp .env.example .env.local
```

Configure as chaves de API, variáveis de ambiente de banco de dados, etc.

---

## 📁 Estrutura de Pastas (sugestão)

```
📦 next-finance-web
├── app/ ou pages/        # Rotas da aplicação
├── components/           # Componentes reutilizáveis
├── lib/ ou utils/        # Funções auxiliares
├── styles/               # Estilos e configuração do Tailwind
├── public/               # Arquivos estáticos
├── prisma/ ou db/        # ORM e acesso ao banco (se aplicável)
```

---

## 📡 Deploy

Este projeto está preparado para deploy contínuo via [Vercel](https://vercel.com/). Após conectar o repositório, qualquer `push` na `main` ou `production` gera um novo deploy.

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).

---

## 👤 Autor

Feito com ❤️ por [Anderson do Carmo Nunes](https://www.linkedin.com/in/andersonnunes29/)  
📫 anderson.nunes290@outlook.com
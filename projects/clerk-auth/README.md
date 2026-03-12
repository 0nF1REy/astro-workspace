# Clerk Auth

Demo minimalista de autenticação com [Clerk](https://clerk.com/) usando Astro.

Após login, o usuário é redirecionado para a página protegida `/`, que exibe apenas **Hello World!**.

## Objetivo do projeto

Este projeto existe para demonstrar um fluxo simples e funcional de autenticação:

- Login com Clerk
- Criação de conta com Clerk
- Proteção de rotas no servidor via middleware
- Redirecionamento automático para evitar acesso indevido às páginas de auth quando o usuário já está autenticado

## Rotas atuais

- `/login` → tela de login (pública)
- `/new-account` → tela de cadastro (pública)
- `/` → página protegida com `Hello World!`

Se o usuário **não** estiver autenticado e tentar acessar `/`, o middleware redireciona para `/login`.
Se o usuário **já** estiver autenticado e acessar `/login` ou `/new-account`, ele é redirecionado para `/`.

## Stack

- Astro 5
- Clerk (`@clerk/astro`)
- Tailwind via `@tailwindcss/vite`
- Adapter Cloudflare (`@astrojs/cloudflare`)

## Configuração de ambiente

Crie um arquivo `.env` (ou copie de `.env.example`) com:

```dotenv
PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY
```

Você encontra essas chaves no painel do Clerk.

## Como rodar localmente

No diretório do projeto:

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:4321`.

## Scripts

| Comando           | Descrição                          |
| :---------------- | :--------------------------------- |
| `npm run dev`     | Inicia ambiente de desenvolvimento |
| `npm run build`   | Gera build de produção             |
| `npm run preview` | Executa preview do build           |
| `npm run astro`   | Executa comandos do Astro CLI      |

## Estrutura principal

```text
src/
├── middleware.ts          # Proteção de rotas e redirecionamentos
├── layouts/
│   ├── AuthLayout.astro   # Layout das telas de login/cadastro
│   └── BaseLayout.astro   # Layout da área autenticada
├── pages/
│   ├── index.astro        # Página protegida (Hello World)
│   ├── login.astro        # Login Clerk
│   └── new-account.astro  # Cadastro Clerk
└── scripts/
	└── clerk-translate.js # Ajustes de tradução de termos do Clerk
```

## Observações

- O projeto está em modo `output: "server"` no Astro.
- A integração do Clerk está com localização `ptBR` configurada em `astro.config.mjs`.
- O foco aqui é **somente autenticação**; não há regras de negócio além da proteção de rota e redirecionamentos.

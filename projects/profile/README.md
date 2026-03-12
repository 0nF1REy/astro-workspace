# Profile

Projeto em **Astro** para página de perfil pessoal com foco em links externos (Rate Your Music, MyAnimeList e Letterboxd), com duas propostas visuais acessíveis por rota:

- `v1`: layout centralizado com avatar e cards de links.
- `v2`: layout dividido em duas colunas com interação em destaque.

A rota `/` redireciona automaticamente para `/v1`.

![Banner - Profile - V1](/docs/images/showcases/profile/profile-v1.png)
![Banner - Profile - V2](/docs/images/showcases/profile/profile-v2.png)

## Objetivo

Servir como “link hub” pessoal, com identidade visual forte e estrutura simples para manutenção de dados (nome, slogan, avatar e links) em um único lugar.

## Stack

- **Astro 5**
- **Sass (SCSS)** para estilização e variáveis globais
- **Font Awesome** para ícones
- **@astrojs/vercel** para deploy em ambiente Vercel

## Rotas

- `/` → redireciona para `/v1`
- `/v1` → versão clássica do profile
- `/v2` → versão experimental com layout split

## Estrutura principal

```text
src/
├── components/
│   ├── v1/
│   │   ├── Avatar.astro
│   │   ├── LinkCard.astro
│   │   └── ProfileView.astro
│   └── v2/
│       ├── LinkCard.astro
│       └── ProfileView.astro
├── data/
│   └── profile.ts
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── v1.astro
│   └── v2.astro
└── styles/
	└── _variables.scss
```

## Fonte dos dados

Os dados principais do perfil ficam centralizados em:

- `src/data/profile.ts`

Nele estão definidos:

- `name`
- `slogan`
- `avatarUrl`
- `links[]` (com `label`, `url` e `image`)

Isso permite alterar conteúdo sem mexer na estrutura dos componentes.

## Assets

- Avatar: `public/assets/images/persona/`
- Logotipos das plataformas: `public/assets/images/isotypes/`

## Estilo global

O layout base está em `src/layouts/Layout.astro`, que:

- importa variáveis SCSS globais;
- aplica fontes (`Inter`, `Orbitron` e, em `v2`, `Lora`);
- controla comportamento de rolagem por página via prop `enablePageScroll`.

As variáveis de tema estão em `src/styles/_variables.scss`.

## Como rodar localmente

Na raiz do projeto (`projects/profile`):

```bash
npm install
npm run dev
```

Servidor local padrão: `http://localhost:4321`

## Scripts disponíveis

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run preview` — preview local do build
- `npm run astro` — comandos da CLI Astro

## Build e deploy

O projeto já está configurado com adapter da Vercel em `astro.config.mjs`.

Para gerar build:

```bash
npm run build
```

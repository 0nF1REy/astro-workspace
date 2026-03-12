<p align="center">
    <img src="../../resources/images/docs/project-highlights/p5js-workspace/logotype.png" width="250" alt="Logotipo — p5.js Workspace" />
</p>

<div align="center">

![Maintenance](https://img.shields.io/maintenance/yes/2026?style=for-the-badge)
![License MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## 📖 Descrição <a name="descricao"></a>

Landing page construída com Astro para selecionar ambientes de execução do p5.js.  
A interface apresenta dois atalhos principais (STATIC e DYNAMIC) em um layout temático com estilos globais em SCSS.

## ✨ O que este projeto faz

- Exibe uma tela inicial única para navegação rápida entre sketches p5.js.
- Centraliza os links de navegação em uma camada de dados tipada.
- Aplica identidade visual customizada com variáveis SCSS e fontes externas.
- Mantém estrutura simples e focada em front-end estático.

## 🧱 Estrutura atual

```text
/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Home.astro
│   ├── data/
│   │   └── links.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── _variables.scss
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🛠️ Scripts

Execute os comandos na pasta `web`:

| Comando                   | Descrição                                          |
| :------------------------ | :------------------------------------------------- |
| `npm install`             | Instala as dependências do projeto                 |
| `npm run dev`             | Inicia o servidor local em `http://localhost:4321` |
| `npm run build`           | Gera a versão de produção em `dist/`               |
| `npm run preview`         | Sobe uma prévia local do build de produção         |
| `npm run astro -- --help` | Exibe ajuda da CLI do Astro                        |

## 🎨 Stack

- Astro
- TypeScript
- SCSS (`sass`)

## 📌 Observações

- Os destinos dos botões (STATIC/DYNAMIC) são definidos em `src/data/links.ts`.
- O tema global (cores e tokens) está em `src/styles/_variables.scss`.
- O layout base e estilos globais ficam em `src/layouts/Layout.astro`.

## 📚 Referência

- Documentação oficial do Astro: https://docs.astro.build

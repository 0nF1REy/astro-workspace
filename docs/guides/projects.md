# Projetos

[← Voltar ao README](../../README.md)

Documentação detalhada de cada projeto do **Astro Workspace**.

## Índice

- [🎭 ATARASHII GAKKO! Landing Page](#atarashii-gakko)
- [🛒 Product Management](#product-management)
- [📝 Scriptora](#scriptora)
- [👤 Profile](#profile)
- [🎨 p5.js Workspace](#p5js-workspace)

---

## 🎭 ATARASHII GAKKO! Landing Page <a name="atarashii-gakko"></a>

**📁 Pasta:** `projects/atarashii-gakko/`  
**🎯 Descrição:** Clone da landing page oficial do grupo japonês ATARASHII GAKKO!, apresentando sua discografia mais recente, datas da turnê mundial e cadastro de newsletter.

![Banner - Atarashii Gakko](../images/showcases/atarashii-gakko/atarashii-gakko.png)

### ✨ Funcionalidades

- **🎵 Seção de Discografia:** Exibição visual dos álbuns e singles mais recentes
- **🌍 Datas da Turnê Mundial:** Lista interativa de shows com informações de venues
- **📧 Newsletter:** Sistema de cadastro para receber atualizações
- **📱 Design Responsivo:** Otimizado para dispositivos móveis e desktop
- **🎨 Interface Moderna:** Uso de SCSS para estilização avançada

## 🛒 Product Management <a name="product-management"></a>

**📁 Pasta:** `projects/product-management/`  
**🎯 Descrição:** Sistema completo para cadastro, edição e listagem de produtos, com autenticação de usuários e integração ao Firebase. O projeto utiliza Astro com React, SCSS modular, tipagem TypeScript e layout centralizado, focando em boas práticas de UX e arquitetura escalável.

![Banner - Product Management](../images/showcases/product-management/product-management.png)

### ✨ Funcionalidades

- **🔐 Autenticação:** Login e registro de usuários com Firebase Auth
- **📦 Cadastro de Produtos:** Adição, edição e remoção de produtos
- **📋 Listagem Dinâmica:** Visualização dos produtos cadastrados
- **🎨 SCSS Modular:** Estilos organizados por componente e variáveis globais
- **⚛️ Componentes React:** Formulários e listas interativos com tipagem forte
- **🗄️ Integração com Firebase:** Persistência dos dados dos produtos e usuários
- **🖌️ Identidade Visual:** Logotipo próprio e fontes customizadas

---

## 📝 Scriptora <a name="scriptora"></a>

**📁 Pasta:** `projects/scriptora/`  
**🎯 Descrição:** Blog e site de conteúdo construído com Astro, focado em publicação de artigos usando as Content Collections do Astro. O projeto reúne um conjunto de componentes reutilizáveis (cards, navbar, busca, paginação), uma API simples de busca (serverless) e uma organização de conteúdo em Markdown para facilitar criação e manutenção editorial.

![Banner - Scriptora](../images/showcases/scriptora/scriptora.png)

### ✨ Funcionalidades

- **📰 Gestão de Conteúdo:** Conteúdos em Markdown organizados em `src/content/blog/` com metadados (tags, data, autor)
- **🔎 Busca Local:** Endpoint de busca (`src/pages/api/search.json.ts`) para pesquisar artigos
- **🏷️ Tags & Páginas de Tag:** Filtragem por tags e listagem de artigos por tag
- **📄 Páginas de Artigo Dinâmicas:** Roteamento para artigos em `src/pages/articles/[...slug].astro`
- **🧩 Componentes Reutilizáveis:** `ArticleCard`, `SearchForm`, `Pagination`, `Navbar`, `Tags`
- **📸 Gestão de Imagens:** Pastas de imagens públicas e otimização via integração com o pipeline de build do Astro
- **📱 Responsividade:** Layouts e componentes otimizados para mobile e desktop

---

## 👤 Profile <a name="profile"></a>

**📁 Pasta:** `projects/profile/`  
**🎯 Descrição:** Página de perfil pessoal construída com Astro, focada em centralizar links externos em uma experiência visual marcante. O projeto possui duas variações de interface (`/v1` e `/v2`) e redireciona a rota principal para a versão padrão.

![Banner - Profile - V1](../images/showcases/profile/profile-v1.png)
![Banner - Profile - V2](../images/showcases/profile/profile-v2.png)

### ✨ Funcionalidades

- **🔁 Redirecionamento Inteligente:** A rota `/` redireciona automaticamente para `/v1`
- **🧩 Duas Versões de Interface:** `v1` com cards centralizados e `v2` com layout split interativo
- **🖼️ Avatar e Isotipos:** Exibição de foto de perfil e logos de plataformas sociais
- **🔗 Link Hub Pessoal:** Atalhos para Rate Your Music, MyAnimeList e Letterboxd
- **🎨 Identidade Visual Própria:** Tema dark com animações, transições e tipografia customizada
- **📱 Responsividade:** Adaptação de layout para desktop e mobile

---

## 🎨 p5.js Workspace <a name="p5js-workspace"></a>

**📁 Pasta:** `projects/p5js-workspace/`  
**🎯 Descrição:** Landing page desenvolvida com Astro para selecionar rapidamente ambientes de execução de sketches p5.js, com foco em navegação direta para variações estática e dinâmica.

![Banner - p5.js Workspace](../images/showcases/p5js-workspace/homepage.png)

### ✨ Funcionalidades

- **🧭 Seletor de Ambientes:** Atalhos rápidos para execuções `STATIC` e `DYNAMIC`
- **🧱 Arquitetura Enxuta:** Estrutura simples com separação entre layout, componente principal e dados
- **🧾 Dados Tipados:** Links centralizados em camada TypeScript (`src/data/links.ts`)
- **🎨 Tema Customizado:** Identidade visual com variáveis SCSS, tipografia externa e efeitos de destaque
- **📱 Interface Responsiva:** Comportamento adaptado para diferentes tamanhos de tela

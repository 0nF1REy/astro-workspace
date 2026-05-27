# Scripts do Projeto

Este documento descreve os scripts npm disponíveis utilizados no projeto.

---

# 💻 Desenvolvimento

## dev

Inicia o servidor de desenvolvimento local do Astro.

```bash
npm run dev
```

Utiliza o banco local/file database do Astro DB.

---

## dev:remote

Inicia o Astro utilizando o banco remoto.

```bash
npm run dev:remote
```

Útil para testar localmente um comportamento mais próximo do ambiente de produção com Astro DB.

---

## dev:full

Executa o Astro e o json-server simultaneamente.

```bash
npm run dev:full
```

Inicia:

- servidor de desenvolvimento do Astro
- mock API com json-server

Útil para rotas de desenvolvimento que dependem de APIs REST mockadas.

---

# 🏗️ Build & Preview

## build

Limpa a pasta `dist` e gera a build de produção.

```bash
npm run build
```

Executa internamente:

```bash
npm run clean && astro build --remote
```

A flag `--remote` é necessária porque o projeto utiliza Astro DB com suporte remoto/libSQL.

---

## preview

Inicia o servidor de preview da build de produção.

```bash
npm run preview
```

Útil para validar localmente a build final antes do deploy.

---

# 🔧 Manutenção

## clean

Remove a pasta `dist` gerada pela build.

```bash
npm run clean
```

Utiliza:

- rimraf

---

## check

Executa diagnósticos do Astro e validação de tipos/conteúdo.

```bash
npm run check
```

Útil antes de commits e deploys.

---

## sync

Sincroniza os tipos gerados automaticamente pelo Astro.

```bash
npm run sync
```

Útil após:

- mudanças em content collections
- alterações no schema do Astro DB
- mudanças em integrações

---

## info

Exibe informações do ambiente e do projeto Astro.

```bash
npm run info
```

Mostra:

- versão do Astro
- versão do Vite
- versão do Node.js
- integrações instaladas
- adapter utilizado

---

# 🗄️ Astro DB

## db:push

Envia o schema do Astro DB para o banco remoto.

```bash
npm run db:push
```

---

## db:seed

Executa remotamente o script de seed do banco.

```bash
npm run db:seed
```

Utilizado para popular o banco com dados iniciais/mockados.

---

# 🎭 Mock API

## server

Inicia a instância local do json-server.

```bash
npm run server
```

Utiliza:

```txt
mock/db.json
```

Disponível apenas para fluxos de desenvolvimento.

---

# ⬆️ Upgrade

## upgrade

Executa a ferramenta oficial de upgrade do Astro.

```bash
npm run upgrade
```

Útil para atualizar dependências e migrações do Astro.

---

# Observações

## Astro DB e --remote

Este projeto utiliza Astro DB com integração remota/libSQL.

Por isso:

```bash
astro build --remote
```

é necessário para builds de produção.

Sem `--remote`, o Astro pode lançar erros relacionados ao banco durante a build.

---

## Páginas SSR

Algumas rotas utilizam:

```astro
export const prerender = false;
```

para habilitar renderização em runtime e atualização dinâmica dos dados em produção.

Isso é especialmente importante para páginas conectadas ao Astro DB.

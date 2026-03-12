<h1 align="center">
    Portfólio - Alan Ryan
</h1>

<div align="center">

![Maintenance](https://img.shields.io/maintenance/yes/2026?style=for-the-badge)
![License MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

## 📖 Descrição

Um portfólio pessoal construído com Astro, TypeScript e collections para gerenciar projetos. Esta versão utiliza componentes Astro/React, imagens otimizadas com `astro:assets` e conteúdo organizado em `src/content/projects`.

## Demonstração

Localmente, execute o servidor de desenvolvimento (veja abaixo). Não há uma URL pública ligada automaticamente neste repositório.

## Instalação

Instale dependências a partir da raiz do workspace do `portfolio`:

```bash
npm install
```

## 🧞 Scripts úteis

Execute os comandos a partir da pasta `portfolio` (ou ajuste seu terminal para esse diretório):

| Comando                   | Ação                                                     |
| :------------------------ | :------------------------------------------------------- |
| `npm install`             | Instala as dependências                                  |
| `npm run dev`             | Inicia o servidor de desenvolvimento em `localhost:4321` |
| `npm run build`           | Compila o site de produção para `./dist/`                |
| `npm run preview`         | Pré-visualiza a build localmente antes de publicar       |
| `npm run astro ...`       | Executa comandos da CLI como `astro add`, `astro check`  |
| `npm run astro -- --help` | Mostra ajuda da CLI do Astro                             |

## Estrutura de conteúdo (projects)

Este projeto usa Astro Collections para armazenar projetos em `src/content/projects` como arquivos JSON. Cada entrada segue a coleção `projects` e referencia imagens em `src/content/projects/images/`.

Exemplo mínimo de entrada (JSON):

```json
{
  "id": "project-1",
  "title": "Nome do Projeto",
  "client": "Cliente X",
  "work": "Design / Frontend",
  "mainImage": "./images/project-1.jpg",
  "otherImages": ["./images/project-1-2.jpg"],
  "storyTitle": "O Desafio",
  "storyContent": "Descrição do projeto...",
  "dayOneTitle": "Primeiros passos",
  "dayOneContent": "Como começamos..."
}
```

Adicione as imagens na pasta `src/content/projects/images` e os metadados como acima.

## Tipagem e componentes

O projeto usa `CollectionEntry<'projects'>` (via `astro:content`) para tipar entradas e `astro:assets` para otimizar imagens. Componentes relevantes ficam em `src/components` e seções reutilizáveis em `src/sections`.

## Rodando checagens locais

Rode o TypeScript/ASTRO check:

```bash
npx astro check
npx tsc --noEmit
```

---

## 📜 Licença <a name="licenca"></a>

Este projeto está sob a **licença MIT**. Consulte o arquivo **[LICENSE](LICENSE)** para obter mais detalhes.

> ℹ️ **Aviso de Licença:** &copy; 2025-2026 Alan Ryan da Silva Domingues. Este projeto está licenciado sob os termos da licença MIT. Isso significa que você pode usá-lo, copiá-lo, modificá-lo e distribuí-lo com liberdade, desde que mantenha os avisos de copyright.

⭐ Se este repositório foi útil para você, considere dar uma estrela!

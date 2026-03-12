# Make Workspaces

Este repositório usa arquivos de **VS Code Multi-Root Workspace** versionados para abrir um projeto específico sem perder o Git da raiz.

## Quando usar

Em vez de executar `code .` dentro de `projects/nome-do-projeto`, use o workspace versionado correspondente.

Esse fluxo é útil quando você quer:

- manter o histórico e a view de Source Control apontando para o repositório raiz
- trabalhar com foco em um único projeto
- reduzir o peso do VS Code ao evitar indexação e file watchers desnecessários

## Como abrir um projeto

Na raiz do repositório, execute:

```bash
make help
make list
make open p=astro-blog

# atalhos diretos
make astro-blog
make scriptora
make profile
```

## O que cada workspace abre

Cada arquivo `.code-workspace` abre duas pastas no VS Code:

- o projeto atual, como pasta principal de trabalho
- a raiz do repositório, para manter Git, documentação e arquivos globais acessíveis

## Por que isso é melhor que `code .` na subpasta

- **Git funcional:** o VS Code continua detectando o repositório raiz
- **Menos peso:** o workspace esconde e deixa de observar as outras pastas de projeto pela raiz
- **Mais foco:** a árvore principal mostra o projeto atual, sem perder acesso a `docs/` e arquivos compartilhados

## Comandos disponíveis

- `make help`: mostra todos os comandos e atalhos
- `make list`: lista os projetos detectados automaticamente
- `make open p=<nome-do-projeto>`: abre um projeto pelo nome
- `make <nome-do-projeto>`: abre o atalho direto do projeto
- `make blog`: alias curto para `astro-blog`

## Observação importante

Abrir diretamente uma subpasta com `code .` continua sendo uma sessão focada apenas naquela pasta. Isso não transforma automaticamente a subpasta em raiz Git do repositório pai dentro do VS Code.

Se a intenção for trabalhar com o Git da raiz e manter o editor mais leve, o fluxo recomendado neste repositório é abrir o arquivo `.code-workspace` correspondente.

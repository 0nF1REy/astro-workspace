MAKEFLAGS += --no-print-directory

.DEFAULT_GOAL := help

.PHONY: help contexto send add status sync \
	dev dev-remote dev-full \
	build preview clean \
	check sync-types info upgrade astro \
	db-push db-seed \
	server

# ========================= Help =========================

help: ## Mostra os comandos disponíveis
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

# ========================= Contexto =========================

contexto: ## Gera o arquivo contexto.txt com repomix
	@echo "Limpando arquivo antigo..."
	@rm -f contexto.txt
	@echo "Gerando novo contexto..."
	@npx --yes repomix --output contexto.txt
	@echo "Pronto!"

send: contexto ## Copia o contexto para o clipboard
	@echo "Copiando para o clipboard..."
	@cat contexto.txt | xclip -selection clipboard
	@echo "Copiado! Agora é só colar."

# ========================= Git =========================

add: ## Adiciona todas as mudanças do repositório ao stage (via raiz)
	@echo "Indo para a raiz e executando git add..."
	@cd ../../ && $(MAKE) add

status: ## Mostra o status atual do repositório (via raiz)
	@echo "Indo para a raiz e verificando o status..."
	@cd ../../ && $(MAKE) status

sync: ## Sincroniza o repositório (via raiz)
	@echo "Indo para a raiz do repositorio..."
	@cd ../../ && $(MAKE) sync
	@echo "Sincronizacao concluida!"

# ========================= Astro =========================

dev: ## Inicia o servidor de desenvolvimento do Astro
	@npm run dev

dev-remote: ## Inicia Astro usando banco remoto
	@npm run dev:remote

dev-full: ## Inicia Astro + json-server
	@npm run dev:full

build: ## Gera a build de produção
	@npm run build

preview: ## Visualiza a build de produção
	@npm run preview

clean: ## Remove a pasta dist
	@npm run clean

check: ## Executa verificações do Astro
	@npm run check

sync-types: ## Sincroniza tipos gerados pelo Astro
	@npm run sync

info: ## Exibe informações do ambiente
	@npm run info

upgrade: ## Atualiza dependências do Astro
	@npm run upgrade

astro: ## Executa comandos da CLI do Astro
	@npm run astro

# ========================= Astro DB =========================

db-push: ## Envia schema do Astro DB
	@npm run db:push

db-seed: ## Executa seed no banco remoto
	@npm run db:seed

# ========================= Mock API =========================

server: ## Inicia o json-server
	@npm run server

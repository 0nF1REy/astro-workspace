MAKEFLAGS += --no-print-directory

.DEFAULT_GOAL := help

ROOT_DIR := ../../

.PHONY: help contexto send git-context add status sync

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

git-context: ## Gera contexto Git + Prompt AI para o clipboard (via raiz)
	@echo "▐▓▒░ Delegando '$@' para a raiz do repositorio..."
	@cd $(ROOT_DIR) && $(MAKE) git-context

# ========================= Git =========================

add: ## Adiciona todas as mudanças do repositório ao stage (via raiz)
	@echo "▐▓▒░ Delegando '$@' para a raiz do repositorio..."
	@cd $(ROOT_DIR) && $(MAKE) add

status: ## Mostra o status atual do repositório (via raiz)
	@echo "▐▓▒░ Delegando '$@' para a raiz do repositorio..."
	@cd $(ROOT_DIR) && $(MAKE) status

sync: ## Sincroniza o repositório (via raiz)
	@echo "▐▓▒░ Delegando '$@' para a raiz do repositorio..."
	@cd $(ROOT_DIR) && $(MAKE) sync
	@echo "Sincronizacao concluida!"

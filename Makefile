.DEFAULT_GOAL := help

WORKSPACE_DIR := projects
PROJECTS := $(sort $(notdir $(wildcard $(WORKSPACE_DIR)/*)))

.PHONY: help list open add status sync git-context \
	atarashii-gakko book-bites cloudinary-form-upload firebase-auth \
	jashin-chan-dropkick lifelong-learning p5js-workspace portfolio \
	profile scriptora

help: ## Mostra os comandos disponíveis
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'
	@echo ""
	@printf "Atalhos disponíveis:\n"
	@for project in $(PROJECTS); do printf "  - %s\n" "$$project"; done

list: ## Lista os projetos disponíveis
	@printf "Projetos disponiveis:\n"
	@for project in $(PROJECTS); do printf " - %s\n" "$$project"; done

open: ## Abre o workspace de um projeto (use p=<nome-do-projeto>)
	@if [ -z "$(p)" ]; then \
		echo "Erro: use 'make open p=nome-do-projeto'"; \
		exit 1; \
	fi
	@if [ ! -f "$(WORKSPACE_DIR)/$(p)/$(p).code-workspace" ]; then \
		echo "Workspace nao encontrado para '$(p)'"; \
		exit 1; \
	fi
	@code "$(WORKSPACE_DIR)/$(p)/$(p).code-workspace"

add: ## Adiciona todas as mudanças ao stage
	@git add .
	@echo "▐▓▒░ Todas as mudanças do repositório foram adicionadas ao stage."

status: ## Mostra o status atual do repositório
	@echo "▐▓▒░ Status atual do repositório:"
	@git status

sync: ## Sincroniza o repositório
	@echo "Buscando atualizações remotas (Pull)..."
	@git pull --rebase --autostash origin main
	@echo "Enviando atualizações locais (Push)..."
	@git push origin main
	@echo "Sincronização completa!"
	@echo ""
	@echo "▐▓▒░ Status atual do repositório:"
	@git status

git-context: ## Gera contexto Git + Prompt AI para o clipboard
	@echo "### AI INSTRUCTIONS ###" > context.tmp
	@cat docs/ai/commit-prompt.txt >> context.tmp
	@echo "\n### GIT STATUS ###" >> context.tmp
	@git status --porcelain=1 -b >> context.tmp
	@echo "\n### GIT NAME-STATUS ###" >> context.tmp
	@git diff --cached --name-status >> context.tmp
	@echo "\n### GIT STAT ###" >> context.tmp
	@git diff --cached --stat >> context.tmp
	@echo "\n### GIT DIFF ###" >> context.tmp
	@git diff --cached >> context.tmp
	@echo "\n### GIT LOG ###" >> context.tmp
	@git log --oneline -n 20 >> context.tmp
	@cat context.tmp | xclip -selection clipboard
	@rm context.tmp
	@echo "▐▓▒░ Contexto e Instruções copiados com sucesso!"

atarashii-gakko:
	@code "$(WORKSPACE_DIR)/atarashii-gakko/atarashii-gakko.code-workspace"

book-bites:
	@code "$(WORKSPACE_DIR)/book-bites/book-bites.code-workspace"

cloudinary-form-upload:
	@code "$(WORKSPACE_DIR)/cloudinary-form-upload/cloudinary-form-upload.code-workspace"

firebase-auth:
	@code "$(WORKSPACE_DIR)/firebase-auth/firebase-auth.code-workspace"

jashin-chan-dropkick:
	@code "$(WORKSPACE_DIR)/jashin-chan-dropkick/jashin-chan-dropkick.code-workspace"

lifelong-learning:
	@code "$(WORKSPACE_DIR)/lifelong-learning/lifelong-learning.code-workspace"

p5js-workspace:
	@code "$(WORKSPACE_DIR)/p5js-workspace/p5js-workspace.code-workspace"

portfolio:
	@code "$(WORKSPACE_DIR)/portfolio/portfolio.code-workspace"

profile:
	@code "$(WORKSPACE_DIR)/profile/profile.code-workspace"

scriptora:
	@code "$(WORKSPACE_DIR)/scriptora/scriptora.code-workspace"

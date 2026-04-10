.DEFAULT_GOAL := help

WORKSPACE_DIR := projects
PROJECTS := $(sort $(notdir $(wildcard $(WORKSPACE_DIR)/*)))

.PHONY: help list open sync \
	atarashii-gakko clerk-auth cloudinary-form-upload \
	jashin-chan-dropkick p5js-workspace portfolio product-management profile scriptora

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

sync: ## Sincroniza mudanças (Pull + Push)
	@echo "Buscando atualizações remotas (Pull)..."
	@git pull origin main
	@echo "Enviando atualizações locais (Push)..."
	@git push origin main
	@echo "Sincronização completa!"
	@echo ""
	@echo "Status atual do repositório:"
	@git status

atarashii-gakko:
	@code "$(WORKSPACE_DIR)/atarashii-gakko/atarashii-gakko.code-workspace"

clerk-auth:
	@code "$(WORKSPACE_DIR)/clerk-auth/clerk-auth.code-workspace"

cloudinary-form-upload:
	@code "$(WORKSPACE_DIR)/cloudinary-form-upload/cloudinary-form-upload.code-workspace"

jashin-chan-dropkick:
	@code "$(WORKSPACE_DIR)/jashin-chan-dropkick/jashin-chan-dropkick.code-workspace"

p5js-workspace:
	@code "$(WORKSPACE_DIR)/p5js-workspace/p5js-workspace.code-workspace"

portfolio:
	@code "$(WORKSPACE_DIR)/portfolio/portfolio.code-workspace"

product-management:
	@code "$(WORKSPACE_DIR)/product-management/product-management.code-workspace"

profile:
	@code "$(WORKSPACE_DIR)/profile/profile.code-workspace"

scriptora:
	@code "$(WORKSPACE_DIR)/scriptora/scriptora.code-workspace"

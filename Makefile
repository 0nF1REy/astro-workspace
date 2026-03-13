.DEFAULT_GOAL := help

WORKSPACE_DIR := projects
PROJECTS := $(sort $(notdir $(wildcard $(WORKSPACE_DIR)/*)))

.PHONY: help list open \
	astro-sample atarashii-gakko clerk-auth cloudinary-form-upload \
	jashin-chan-dropkick p5js-workspace portfolio product-management profile scriptora \


help:
	@printf "Uso:\n"
	@printf "  make list                          Lista os projetos disponiveis\n"
	@printf "  make open p=<nome-do-projeto>      Abre o workspace de um projeto\n"
	@printf "  make <nome-do-projeto>             Abre o atalho direto do projeto\n"
	@printf "\nAtalhos disponiveis:\n"
	@for project in $(PROJECTS); do printf "  - %s\n" "$$project"; done

list:
	@printf "Projetos disponiveis:\n"
	@for project in $(PROJECTS); do printf " - %s\n" "$$project"; done

open:
	@if [ -z "$(p)" ]; then \
		echo "Erro: use 'make open p=nome-do-projeto'"; \
		exit 1; \
	fi
	@if [ ! -f "$(WORKSPACE_DIR)/$(p)/$(p).code-workspace" ]; then \
		echo "Workspace nao encontrado para '$(p)'"; \
		exit 1; \
	fi
	@code "$(WORKSPACE_DIR)/$(p)/$(p).code-workspace"

astro-sample:
	@code "$(WORKSPACE_DIR)/astro-sample/astro-sample.code-workspace"

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

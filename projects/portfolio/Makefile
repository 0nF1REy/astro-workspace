MAKEFLAGS += --no-print-directory

.DEFAULT_GOAL := help

.PHONY: help contexto send

help: ## Mostra os comandos disponíveis
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

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
